from datetime import datetime as dt, timedelta as td                    # noqa
from os.path import realpath, split
from pathlib import Path                                                # noqa

from flask import (                                                     # noqa
    Flask, Blueprint, Request, Response, flash, g, jsonify,
    make_response as response, redirect, render_template as render, request,
    safe_join as join, session, url_for as to)

from flask_alembic import Alembic

from flask_assets import Bundle, Environment as Assets                  # noqa

from flask_babel import Babel

from .util import X, _, b, collapse, echo                               # noqa


__root_path = join('/', *split(realpath(__file__))[0].split('/'))


from . import (                                                         # noqa
    api as _api,
    auth as _auth,
    cache as _cache,
    cli as _cli,
    components as _components,
    config as _config,
    context as _context,
    db as _db,
    errors as _errors,
    filters as _filters,
    queues as _queues,
    sockets as _sockets,
    static as _static,
    templates as _templates,
    web as _web
)


api = _api.api
cache = _cache.cache
components = _components.components
config = _config.config
context = _context.context
db = _db.db
emit = _sockets.emit
env = _config.env
error = _errors.error
filter = _db.filter
forget = _cache.forget
memo = _cache.memo
model = _db.model
on = _db.on
queue = _queues.queue
register = _api.register
resource = _api.resource
schemas = _api.schemas
send = _sockets.send
socket = _sockets.socket
store = _cache.store
synonym = _db.synonym
timestamps = _db.timestamps
web = _web.web
validates = _db.validates

Model = _db.db.Model
Resource = _api.Resource
User = _auth.User


class Application(Flask):

    def __init__(self, name='app', **params):

        if 'static_url_path' not in params:
            params['static_url_path'] = '/-'

        super().__init__(name, **params)

        _config.start(self)

        db.init_app(self)
        store.init_app(self)
        schemas.init_app(self)

        self.assets = Assets(self)
        self.assets.auto_build = False
        self.assets.cache = env.cache_path
        self.assets.directory = self.root_path
        self.assets.load_path = [self.root_path]
        self.assets.manifest = False
        self.assets.url = '/'

        self.db = db

        self.jinja_options = _config.jinja_options

        self.json_encoder = _api.Encoder

        self.locale = Babel(self)

        self.migrations = Alembic(self, run_mkdir=False)
        self.migrations.rev_id = lambda: '%04d' % (env.database_revision + 1,)

        self.schemas = schemas

        self.store = store

        self.templates = self.jinja_env
        self.templates.hamlish_enable_div_shortcut = True
        self.templates.hamlish_mode = 'indented'
        self.templates.filters.update(_context.filters)

        self.is_started = False

    def start(self):

        if (self.is_started):
            raise ValueError('%s is already started' % (self.import_name,))

        self.errorhandler(_errors.error)
        self.context_processor(_context.process)
        self.shell_context_processor(_context.process)
        self.before_request(_auth.authorize)

        _cli.start(self)
        _errors.start(self)
        _queues.start(self)
        _static.start(self)

        _api.start(self)
        _components.start(self)
        _web.start(self)

        self.is_started = True

        return self
