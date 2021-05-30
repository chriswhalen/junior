# this section is marked "noqa" because flake8 complains about unused imports.
# most of what we import here is not used directly by this module,
# but is intended to be imported from this module by the user.

from datetime import datetime as dt, timedelta as td                    # noqa
from os.path import realpath as path, split
from pathlib import Path                                                # noqa
from warnings import catch_warnings, filterwarnings as filter_warnings

from flask import (                                                     # noqa
    Blueprint, Flask, Request, Response, flash, g, jsonify,
    make_response as response, redirect, render_template as render, request,
    safe_join as join, session, url_for as to)

from flask_alembic import Alembic

from flask_assets import Bundle, Environment as Assets                  # noqa

from flask_babel import Babel

from flask_mailman import EmailMessage as Message, Mail                 # noqa

from whitenoise import WhiteNoise

from .util import X, _, b, echo, flatten                                # noqa


# find the application root's absolute path
__root_path = join('/', *split(path(__file__))[0].split('/'))


# import the framework under private names, to avoid conflicting with aliases
from . import (                                                         # noqa
    api as _api,
    auth as _auth,
    assets as _assets,
    cache as _cache,
    cli as _cli,
    components as _components,
    config as _config,
    context as _context,
    db as _db,
    errors as _errors,
    filters as _filters,
    mail as _mail,
    queue as _queue,
    socket as _socket,
    templates as _templates,
    web as _web
)


# define aliases
api = _api.api
cache = _cache.cache
components = _components.components
config = _config.config
context = _context.context
db = _db.db
debug = _errors.debug
emit = _socket.emit
env = _config.env
error = _errors.error
filter = _db.filter
forget = _cache.forget
get = _cache.get
mail = _mail.mail
memo = _cache.memo
model = _db.model
on = _db.on
queue = _queue.queue
register = _api.register
resource = _api.resource
schemas = _api.schemas
send = _socket.send
set = _cache.set
socket = _socket.socket
store = _cache.store
synonym = _db.synonym
timestamps = _db.timestamps
web = _web.web
validates = _db.validates

Model = _db.db.Model
Resource = _api.Resource
User = _auth.User


class Application(Flask):
    '''
    A wrapper around :class:`~flask.Flask`, serving as
    the single persistent instance of our WSGI application.
    It lasts for the application's entire lifecycle,
    until terminated by the user or server software.

    :class:`Application` accepts the same parameters as
    :class:`~flask.Flask`.

    :param name: the name of our application; passed to ``import_name``
                 and defaults to ``'app'``.
    '''

    def __init__(self, name='app', **params):

        # use /- as the default static path
        if 'static_url_path' not in params:
            params['static_url_path'] = '/-'

        super().__init__(name, **params)

        _config.start(self)

        db.init_app(self)
        store.init_app(self)
        schemas.init_app(self)

        # whitenoise raises a warning if the static folder is missing
        with catch_warnings():

            filter_warnings('ignore')

            self.wsgi_app = WhiteNoise(
                self.wsgi_app,
                root=f'{self._static_folder}/',
                prefix=f'{params["static_url_path"][1:]}/'
            )

        #: An :class:`~flask_assets.Environment`
        #: to compile our application's client-side source files.
        #: Its configuration is managed internally by junior.
        self.assets = Assets(self)
        self.assets.auto_build = False
        self.assets.cache = env.cache_path
        self.assets.directory = self.root_path
        self.assets.load_path = [self.root_path]
        self.assets.manifest = False
        self.assets.url = '/'

        #: An alias of :attr:`junior.db.db`.
        self.db = db

        self.jinja_options = _config.jinja

        self.json_encoder = _api.Encoder

        #: A :class:`~flask_babel.Babel`
        #: to add internationalization and localization tools to our
        #: application.
        #: Its configuration is managed internally by junior.
        self.locale = Babel(self)

        #: A :class:`~flask_mail.Mail`
        #: to allow our application to send mail using an SMTP server.
        #: Its connection details are populated from our application's
        #: configuration.
        self.mail = Mail(self)

        #: An :class:`~flask_alembic.Alembic`
        #: to help us create migrations for our database structure.
        #: Its configuration is managed internally by junior.
        self.migrations = Alembic(self, run_mkdir=False)
        self.migrations.rev_id = lambda: '%04d' % (env.database_revision + 1,)

        #: A :class:`~flask_marshmallow.Marshmallow`
        #: to serialize data records to be served by our RESTful API.
        #: Its configuration is managed internally by junior.
        self.schemas = schemas

        #: An alias of :attr:`junior.cache.store`.
        self.store = store

        #: An alias of :attr:`~flask.Flask.jinja_env`.
        self.templates = self.jinja_env
        self.templates.hamlish_enable_div_shortcut = True
        self.templates.hamlish_mode = 'indented'
        self.templates.filters.update(_context.filters)

        #: Has the application been started?
        #: Defaults to ``False`` and becomes ``True``
        #: after we call :meth:`start`.
        self.is_started = False

    def start(self):
        '''
        Start the application. :meth:`start` may only be called once per
        :class:`Application`; subsequent calls will raise a `ValueError`.

        :meth:`start`:
            * attaches our context processor, error handler,
              and authentication hook;
            * initializes our extensions;
            * registers :attr:`~junior.api.api`,
              :attr:`~junior.components.components`, and
              :attr:`~junior.web.web`.
        '''

        # the application may only be started once
        if (self.is_started):
            raise ValueError(f'{self.import_name} is already started')

        self.errorhandler(_errors.error)
        self.context_processor(_context.process)
        self.shell_context_processor(_context.process)
        self.before_request(_auth.authenticate)

        _assets.start(self)
        _cli.start(self)
        _errors.start(self)
        _queue.start(self)

        _api.start(self)
        _components.start(self)
        _web.start(self)

        # the application is now started
        self.is_started = True

        return self
