from distutils.dir_util import copy_tree
from os import environ
from pathlib import Path
from pprint import pformat
from shutil import rmtree as rm_tree

from flask import Config as FlaskConfig

from munch import Munch

from werkzeug.middleware.proxy_fix import ProxyFix

from yaml import safe_load as load

from . import __root_path, dt, join
from .util import X, flatten


class Config(Munch, FlaskConfig):
    '''
    A :class:`~flask.Config` wrapped in :class:`~junior.util.X`.
    '''

    def __repr__(self):

        return f'Config(\n{pformat(self.__dict__, 2)}\n)'


#: Our :class:`Application` environment variables.
#: :attr:`env` is passed to :class:`~junior.Application` ``.config``.
env = X()

#: Our configuration options.
config = X()

#: Our vendor options.
vendor = X()

#: Our :class:`~flask_babel.Babel` options.
babel = X()

#: Our `PostCSS <https://postcss.org/>`_ options.
postcss = X()

#: Our default :attr:`env`.
defaults = X(
    alembic={},
    auth_factor=10,
    cache_timeout=60,
    cache_path='.cache',
    cache_type='FileSystemCache',
    components_path='components',
    config_path='config',
    database_url=None,
    flask_debug=False,
    flask_env='production',
    migrations_path='migrations',
    proxy_count=0,
    secret_key=None,
    sqlalchemy_track_modifications=False,
    static_path='static',
    static_timeout=2592000,
    scripts_path='scripts',
    styles_path='styles',
    templates_expressions_close='|}',
    templates_expressions_open='{|',
    templates_path='templates',
    tasks_serializer='json'
)


env.config_path = environ.get('config_path', defaults.config_path)


with open(join(__root_path, 'config', 'babel.yaml')) as file:

    babel = X(load(file.read()))

try:
    with open(join(env.config_path, 'babel.yaml')) as file:

        babel.update(load(file.read()))

except (OSError, TypeError):
    pass


with open(join(__root_path, 'config', 'postcss.yaml')) as file:

    postcss = X(load(file.read()))

try:
    with open(join(env.config_path, 'postcss.yaml')) as file:

        postcss.update(load(file.read()))

except (OSError, TypeError):
    pass


try:
    with open(join(env.config_path, 'app.yaml')) as file:

        config.update(X(load(file.read())))

except (OSError, TypeError):
    pass


try:
    with open(join(env.config_path, 'env.yaml')) as file:

        env.update(flatten(load(file.read())))

except (OSError, TypeError):
    pass


try:
    with open(join(env.config_path, 'vendor.yaml')) as file:

        vendor.update(X(load(file.read())))

except (OSError, TypeError):
    pass


if 'cache_dir' not in env:
    env.cache_dir = environ.get('cache_dir', env.cache_path)
    if env.cache_dir is None:
        env.cache_dir = defaults['cache_path']

if 'cache_path' not in env:
    env.cache_path = env.cache_dir


if 'cache_default_timeout' not in env:
    env.cache_default_timeout = environ.get('cache_default_timeout',
                                            env.cache_timeout)
    if env.cache_default_timeout is None:
        env.cache_default_timeout = defaults['cache_timeout']

if 'cache_timeout' not in env:
    env.cache_timeout = env.cache_default_timeout


if 'flask_debug' in env:
    env.debug = env.flask_debug

if env.debug:
    environ['FLASK_DEBUG'] = 'True'


if 'flask_env' in env:
    env.env = env.flask_env


if 'sqlalchemy_database_uri' not in env:
    env.sqlalchemy_database_uri = environ.get('sqlalchemy_database_uri',
                                              env.database_uri)

    if env.sqlalchemy_database_uri is None:
        env.sqlalchemy_database_uri = environ.get('database_uri',
                                                  env.database_url)

if 'database_url' not in env:

    if 'sqlalchemy_database_uri' not in env:
        env.database_url = env.database_uri

    else:
        env.database_url = env.sqlalchemy_database_uri


if 'static_folder' not in env:
    env.static_folder = environ.get('static_folder',
                                    env.static_path)
    if env.static_folder is None:
        env.static_folder = defaults['static_path']

if 'static_path' not in env:
    env.static_path = env.static_folder


if 'send_file_max_age_default' not in env:
    env.send_file_max_age_default = environ.get('send_file_max_age_default',
                                                env.static_timeout)
    if env.send_file_max_age_default is None:
        env.send_file_max_age_default = defaults['static_timeout']

if 'static_timeout' not in env:
    env.static_timeout = env.send_file_max_age_default


if 'task_serializer' not in env:
    env.task_serializer = environ.get('task_serializer',
                                      env.tasks_serializer)
    if env.task_serializer is None:
        env.task_serializer = defaults['tasks_serializer']

if 'tasks_serializer' not in env:
    env.tasks_serializer = env.task_serializer


if 'template_folder' not in env:
    env.template_folder = environ.get('template_folder',
                                      env.templates_path)
    if env.template_folder is None:
        env.template_folder = defaults['templates_path']

if 'templates_path' not in env:
    env.templates_path = env.template_folder


for key in defaults:
    if key not in env:
        env[key] = environ.get(key.upper(), defaults[key])

try:
    env.database_revision = -1

    for migration in Path(env.migrations_path).glob('*_*.py'):

        env.database_revision = max(env.database_revision,
                                    int(migration.name.split('_')[0], 10))

except (OSError, TypeError):
    pass


if 'api' not in config:
    config.api = X()

if 'version' not in config.api:
    config.api.version = 1

if 'updated_at' not in config.api:
    config.api.updated_at = dt.now()


#: Our :class:`~celery.Celery` options.
celery = X(
    broker_url='filesystem://',
    broker_transport_options=X(
        data_folder_in=join(env.cache_path, 'queue'),
        data_folder_out=join(env.cache_path, 'queue'),
        data_folder_processed=env.cache_path
    ),
    result_backend=f'file://{env.cache_path}'
)


#: Our :class:`~jinja2.Environment` options.
jinja = X(
    extensions=['hamlish_jinja.HamlishExtension'],
    variable_start_string=env.templates_expressions_open,
    variable_end_string=env.templates_expressions_close
)


def start(app):
    '''
    Start our configuration service bound to ``app``.
    :meth:`start` wants to be called by :meth:`~junior.Application.start`.

    :param app: an :class:`~junior.Application` for us to configure.
    '''

    app.config = Config(app.config)

    if 'name' not in config:
        config.name = app.import_name

    if env.proxy_count:
        app.wsgi_app = ProxyFix(app.wsgi_app,
                                x_for=env.proxy_count,
                                x_proto=env.proxy_count)

    env.alembic.script_location = join(env.cache_path, 'migrations')

    env.postcss_extra_args = ['--config', join(app.root_path,
                                               env.cache_path)]

    env_upper = {key.upper(): env[key] for key in env}

    app.config.update(env)
    app.config.update(env_upper)
    app.config.update({'APP': config, 'app': config})

    rm_tree(env.cache_path, True)

    Path(env.cache_path).mkdir(exist_ok=True)
    Path(celery.broker_transport_options.data_folder_in).mkdir(exist_ok=True)

    Path(join(env.cache_path, 'empty')).touch()
    Path(join(env.cache_path, 'history')).touch()

    copy_tree(join(__root_path, 'migrations'),
              join(env.cache_path, 'migrations'))

    if Path(env.migrations_path).exists():
        copy_tree(env.migrations_path, join(env.cache_path, 'migrations'))

    with open(join(env.cache_path, 'postcss.config.js'), 'w') as file:

        file.write(f'module.exports = {postcss.toJSON()}')

    with open(join(env.cache_path, 'babel.cfg'), 'w') as file:

        for format in babel:
            for source in babel[format]:

                file.write(f'[{format}: {source.format(**env)}]\n')

                for option in babel[format][source]:

                    if isinstance(babel[format][source][option], list):
                        babel[format][source][option] = (
                            ', '.join(babel[format][source][option]))

                    value = babel[format][source][option].format(**env)

                    file.write(f'{option} = {value}\n')

                file.write('\n')

    return app
