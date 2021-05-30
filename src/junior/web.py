from . import Blueprint, redirect, render, request
from .api import properties
from .context import context
from .errors import MethodNotAllowed, error, handle
from .templates import templates

#: A :class:`~flask.Blueprint` to serve the index template
#: and redirect users to :attr:`~junior.api.api` where needed.
web = Blueprint('web', __name__)


def redirect_to_api(path, api_path='api'):
    '''
    Redirect the user to :attr:`~junior.api.api`
    if ``path`` matches ``api_path``.

    :param path: the user's requested URL path.
    :param data: the root path prefix to :attr:`~junior.api.api`.
    '''

    if path == api_path:

        return redirect(properties.root)

    if path.split('/')[0] == api_path:

        path = ''.join([path.replace(f'{api_path}/', properties.root)])
        return redirect(path)


def defaults():
    '''
    Add a default set of routes to :attr:`web`:

        * ``/`` renders ``index.haml``;
        * a "`missing`" path also renders ``index.haml``
          and the user's request path is sent to our client-side application;
        * ``/api/*`` redirects to :attr:`~junior.api.api`;
        * ``/favicon*`` redirects to our favicon asset path;
        * a raised ``Exception`` calls :meth:`~flask.Flask.errorhandler`
          to render ``error.haml`` with an appropriate error message
          and HTTP status code.
    '''

    @web.route('/favicon<path>')
    def __favicon(path):

        return redirect(context.asset(f'images/favicon{path}'))

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
    '''
    Start :attr:`web` and register it to ``app``.
    :meth:`start` wants to be called by :meth:`~junior.Application.start`.

    :param app: an :class:`~junior.Application` for us to register :attr:`web`.
    '''

    from . import _web

    _web.defaults()

    app.register_blueprint(_web.web)

    return app
