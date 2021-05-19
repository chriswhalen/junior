from . import Blueprint, redirect, render, request
from .api import properties
from .context import context
from .errors import MethodNotAllowed, error, handle
from .templates import templates


web = Blueprint('web', __name__)


def redirect_to_api(path, api_path='api'):

    if path == api_path:

        return redirect(properties.root)

    if path.split('/')[0] == api_path:

        path = ''.join([path.replace(f'{api_path}/', properties.root)])
        return redirect(path)


def defaults():

    @web.route('/favicon<path>')
    def __favicon(path):

        return redirect(context.asset('images/favicon{path}'))

    @web.route('/')
    def __index():

        try:
            return render('index.haml')

        except Exception:
            return templates.get_template('index.haml').render()

    @web.route('/<path:path>',
               methods=['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
    def __default(**params):

        if ('path' in params and
                params['path'] == 'api' or
                params['path'].startswith('api/')):

            return redirect_to_api(params['path'])

        if request.method != 'GET':
            raise MethodNotAllowed

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
