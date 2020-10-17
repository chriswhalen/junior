from . import Blueprint, redirect, render
from .api import properties
from .context import context
from .errors import error, handle
from .templates import templates


web = Blueprint('web', __name__)


def redirect_to_api(path, api_path='api'):

    if path == api_path:
        return redirect(properties.root)

    if path.split('/')[0] == api_path:
        return redirect(''.join([properties.root,
                        path.replace(api_path+'/', '')]))


def defaults():

    @web.route('/favicon<name>')
    def __favicon(name):

        return redirect(context.asset('images/favicon%s' % (name,)))

    @web.route('/')
    def __index():

        try:
            return render('index.haml')

        except Exception:
            return templates.get_template('index.haml').render()

    @web.route('/<path:path>')
    def __default(**params):

        if ('path' in params and
                params['path'] == 'api' or
                params['path'].startswith('api/')):

            return redirect_to_api(params['path'])

        try:
            return render('index.haml')

        except Exception:
            return templates.get_template('index.haml').render()

    @handle('/')
    @web.errorhandler(Exception)
    def __error(exception):

        e = error(exception)

        try:
            return render('error.haml', **e), e.code

        except Exception:
            return templates.get_template('index.haml').render(**e), e.code


def start(app):

    from . import _web

    _web.defaults()

    app.register_blueprint(_web.web)

    return app
