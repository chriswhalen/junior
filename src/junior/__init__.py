from datetime import datetime as dt
from os.path import realpath, split

from flask import (
    Flask, Blueprint, Request, Response, flash, g, jsonify,
    make_response as response, redirect, render_template as render, request,
    safe_join as join, session, url_for as to)

from flask_alembic import Alembic

from flask_assets import Bundle, Environment as Assets

from flask_babel import Babel

from flask_security import Security, cli as SecurityCLI

from .util import X, _, collapse, dump


__root_path = join('/', *split(realpath(__file__))[0].split('/'))


from . import (
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
web = _web.web
validates = _db.validates

Resource = _api.Resource

SecurityCLI.roles = None


class Application(Flask):

    def __init__(self, name='app', **params):

        super().__init__(name, **params)

        self.is_started = False

        _config.start(self)

        self.jinja_options = _config.jinja_options
        self.templates = self.jinja_env

        db.init_app(self)
        store.init_app(self)
        schemas.init_app(self)

        self.assets = Assets(self)
        self.locale = Babel(self)
        self.migrations = Alembic(self)

        self.users = _auth.Users(db, _auth.User, None)
        self.security = Security(self, self.users, register_blueprint=False)

        self.assets.auto_build = False
        self.assets.cache = self.config.cache_dir
        self.assets.directory = self.root_path
        self.assets.load_path = [self.root_path]
        self.assets.manifest = False
        self.assets.url = '/'

        self.templates.hamlish_enable_div_shortcut = True
        self.templates.hamlish_mode = 'indented'
        self.templates.filters.update(_context.filters)

    def start(self):

        if (self.is_started):
            raise ValueError('%s is already started' %
                             (self.import_name,))

        self.errorhandler(_errors.error)
        self.context_processor(_context.process)
        self.shell_context_processor(_context.process)

        _cli.start(self)
        _errors.start(self)
        _queues.start(self)
        _static.start(self)

        _api.start(self)
        _components.start(self)
        _web.start(self)

        self.is_started = True

        return self

# flake8: noqa
