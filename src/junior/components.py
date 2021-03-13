from pathlib import Path

from . import Blueprint, Bundle, dt, join, render, td
from .config import env
from .errors import BundleError, TemplateNotFound, error, handle


components = Blueprint('components', __name__)

components.url_prefix = '/_/'


@components.after_request
def cache(response):

    response.add_etag()

    response.cache_control.public = True
    response.cache_control.max_age = env.static_timeout
    response.expires = dt.now() + td(seconds=env.static_timeout)

    return response


def defaults():

    from . import _components

    @_components.components.route('<path:path>')
    def __default(path):

        try:
            return render('%s.html' % (path.replace('/', '_'),))

        except TemplateNotFound:
            return '<!-- not found: %s -->' % (path,), 404

    @handle(_components.components.url_prefix)
    @_components.components.errorhandler(Exception)
    def __error(exception):

        message = error(exception)
        return '<!-- error: %s -->' % (message.name.lower(),), message.code


def start(app):

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
                                            '%s.html' % (
                                                '_'.join(path.parts[1:],))))

        except (BundleError, TypeError):
            pass

    _components.defaults()

    app.register_blueprint(_components.components,
                           url_prefix=_components.components.url_prefix)

    return app
