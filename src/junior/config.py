import distutils                                                        # noqa
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
from .util import X, collapse


class Config(Munch, FlaskConfig):

    def __repr__(self):

        return 'Config(\n%s\n)' % (pformat(self.__dict__, 2),)


env = X()
config = X()
vendor = X()

babel = X()
postcss = X()

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

        config.update(collapse(load(file.read())))

except (OSError, TypeError):
    pass


try:
    with open(join(env.config_path, 'env.yaml')) as file:

        env.update(collapse(load(file.read())))

except (OSError, TypeError):
    pass


try:
    with open(join(env.config_path, 'vendor.yaml')) as file:

        vendor.update(load(file.read()))

except (OSError, TypeError):
    pass


try:
    with open(join(env.config_path, 'vendor.yaml')) as file:

        vendor.update(load(file.read()))

except (OSError, TypeError):
    pass


for key in defaults:
    if key not in env:
        env[key] = environ.get(key.upper(), defaults[key])


if 'cache_dir' not in env:
    env.cache_dir = environ.get('cache_dir', env.cache_dir)
    if env.cache_dir is None:
        env.cache_dir = join(env.cache_path, 'tmp')


if 'cache_default_timeout' not in env:
    env.cache_default_timeout = environ.get('cache_default_timeout',
                                            env.cache_timeout)
    if env.cache_default_timeout is None:
        env.cache_default_timeout = defaults['cache_timeout']

if 'cache_timeout' not in env:
    env.cache_timeout = env.cache_default_timeout


if 'sqlalchemy_database_uri' not in env:
    env.sqlalchemy_database_uri = environ.get('sqlalchemy_database_uri',
                                              env.database_url)
if 'database_url' not in env:
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


celery_options = X(
    broker_url='filesystem://',
    broker_transport_options=X(
        data_folder_in=join(env.cache_path, 'queue'),
        data_folder_out=join(env.cache_path, 'queue'),
        data_folder_processed=env.cache_path
    ),
    result_backend='file://%s' % (env.cache_path,)
)


jinja_options = X(
    extensions=['hamlish_jinja.HamlishExtension'],
    variable_start_string=env.templates_expressions_open,
    variable_end_string=env.templates_expressions_close
)


def start(app):

    app.config = Config(app.config)

    if 'name' not in config:
        config.name = app.import_name

    if env.proxy_count:
        app.wsgi_app = ProxyFix(app.wsgi_app,
                                x_for=env.proxy_count,
                                x_proto=env.proxy_count)

    env.alembic.script_location = join(env.cache_path, 'migrations')

    env.env = app.config['ENV']

    env.postcss_extra_args = ['--config', join(app.root_path,
                                               env.cache_path)]

    env_upper = {key.upper(): env[key] for key in env}

    app.config.update(env)
    app.config.update(env_upper)
    app.config.update({'APP': config, 'app': config})

    rm_tree(env.cache_path, True)

    Path(env.cache_path).mkdir(exist_ok=True)
    Path(celery_options.broker_transport_options.data_folder_in
         ).mkdir(exist_ok=True)

    Path(join(env.cache_path, 'empty')).touch()
    Path(join(env.cache_path, 'history')).touch()

    copy_tree(join(__root_path, 'migrations'),
              join(env.cache_path, 'migrations'))

    if Path(env.migrations_path).exists():
        copy_tree(env.migrations_path, join(env.cache_path, 'migrations'))

    with open(join(env.cache_path, 'postcss.config.js'), 'w') as file:

        file.write('module.exports = %s' % (postcss.toJSON(),))

    with open(join(env.cache_path, 'babel.cfg'), 'w') as file:

        for format in babel:
            for source in babel[format]:

                file.write('[%s: %s]\n' % (format, source.format(**env)))

                for option in babel[format][source]:

                    if isinstance(babel[format][source][option], list):
                        babel[format][source][option] = (
                            ', '.join(babel[format][source][option]))

                    file.write('%s = %s\n' %
                               (option,
                                babel[format][source][option].format(**env)))

                file.write('\n')

    return app
