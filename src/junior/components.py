from pathlib import Path

from . import Blueprint, Bundle, dt, join, render, td
from .config import env
from .errors import BundleError, TemplateNotFound, error, handle


#: A :class:`~flask.Blueprint` serving our component templates.
components = Blueprint('components', __name__)

#: The URL prefix we want to use for :attr:`components`.
components.url_prefix = '/_/'


@components.after_request
def cache(response):

    response.add_etag()

    response.cache_control.public = True
    response.cache_control.max_age = env.static_timeout
    response.expires = dt.now() + td(seconds=env.static_timeout)

    return response


def defaults():
    '''
    Add a default set of routes to :attr:`components`:

       * the incoming path name is mapped to a component name and rendered;
       * a missing path raises returns a simple HTML comment response
         with HTTP status code 404;
       * a raised ``Exception`` calls :meth:`~flask.Flask.errorhandler`
         to return an HTML comment response with an appropriate error message
         and HTTP status code.
    '''

    from . import _components

    @_components.components.route('<path:path>')
    def __default(path):

        try:
            return render(f'{path.replace("/", "_")}.html')

        except TemplateNotFound:
            return f'<!-- not found: {path} -->', 404

    @handle(_components.components.url_prefix)
    @_components.components.errorhandler(Exception)
    def __error(exception):

        message = error(exception)
        return f'<!-- error: {message.name.lower()} -->', message.code


def start(app):
    '''
    Start :attr:`components` and register it to ``app``.
    :meth:`start` wants to be called by :meth:`~junior.Application.start`.

    :param app: an :class:`~junior.Application` for us to register
                :attr:`components`.
    '''

    from . import _components

    Path(env.components_path).mkdir(exist_ok=True)

    _components.components.template_folder = join(app.root_path,
                                                  env.components_path,
                                                  '_')

    paths = []

    try:
        paths = [path if path.is_dir() else None
                 for path in Path(env.components_path).glob('**/*')]

    except FileNotFoundError:
        pass

    for path in paths:

        if path is None or path.name == '_':
            continue

        bundles = []

        template = join(path, 'template.haml')
        style = join(path, 'style.sss')
        script = join(path, 'script.js')

        if Path(template).is_file():

            bundles.append(Bundle(template,
                                  filters=('hamlish')))

        if Path(style).is_file():

            bundles.append(Bundle(style,
                                  filters=('handle_empty',
                                           'postcss',
                                           'wrap_style')))
        else:

            style = join(path, 'style.css')

            if Path(style).is_file():

                bundles.append(Bundle(style,
                                      filters=('handle_empty', 'wrap_style')))

        if Path(script).is_file():

            bundles.append(Bundle(script,
                                  filters=('require', 'babel', 'wrap_script')))
        try:
            app.assets.register(path.name,
                                *bundles,
                                filters='strip',
                                output=join(env.components_path, '_',
                                            f'{"_".join(path.parts[1:])}.html')
                                )

        except (BundleError, TypeError):
            pass

    _components.defaults()

    app.register_blueprint(_components.components,
                           url_prefix=_components.components.url_prefix)

    return app
