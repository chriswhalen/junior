from os import environ
from pathlib import Path

from flask import Config as FlaskConfig

from munch import Munch

from werkzeug.middleware.proxy_fix import ProxyFix

from yaml import safe_load as load

from . import __root_path, dt, join
from .util import _, collapse


class Config(Munch, FlaskConfig):
    pass


env = _()
config = _()
vendor = _()

babel = _()
postcss = _()

defaults = _(
    cache_default_timeout=60,
    cache_dir='.cache',
    cache_type='filesystem',
    database_url=None,
    flask_debug=False,
    proxies=0,
    secret_key=None,
    security_flash_messages=False,
    security_token_authentication_header='Authorization',
    sqlalchemy_track_modifications=False,
    static_folder='static',
    task_serializer='json'
)

celery_options = _(
    broker_url='filesystem://',
    broker_transport_options=_(
        data_folder_in=join(defaults.cache_dir, 'queue'),
        data_folder_out=join(defaults.cache_dir, 'queue'),
        data_folder_processed=defaults.cache_dir
    ),
    result_backend='file://%s' % (defaults.cache_dir,)
)

jinja_options = _(
    extensions=['hamlish_jinja.HamlishExtension',
                'junior.extensions.HamlBabel'],
    variable_start_string='{|',
    variable_end_string='|}'
)


with open(join(__root_path, 'config', 'babel.yaml')) as file:

    babel = _(load(file.read()))

try:
    with open(join('config', 'babel.yaml')) as file:

        babel.update(load(file.read()))

except (OSError, TypeError):
    pass


with open(join(__root_path, 'config', 'postcss.yaml')) as file:

    postcss = _(load(file.read()))

try:
    with open(join('config', 'postcss.yaml')) as file:

        postcss.update(load(file.read()))

except (OSError, TypeError):
    pass


try:
    with open(join('config', 'app.yaml')) as file:

        config.update(collapse(load(file.read())))

except (OSError, TypeError):
    pass


try:
    with open(join('config', 'env.yaml')) as file:

        env.update(collapse(load(file.read())))

except (OSError, TypeError):
    pass


try:
    with open(join('config', 'vendor.yaml')) as file:

        vendor.update(load(file.read()))

except (OSError, TypeError):
    pass


if 'api' not in config:
    config.api = _()

if 'version' not in config.api:
    config.api.version = 1

if 'updated_at' not in config.api:
    config.api.updated_at = dt.now()

for key in defaults:
    if key not in env:
        env[key] = environ.get(key.upper(), defaults[key])

env.babel_extra_args = ['--config-file',
                        join('.', env.cache_dir, 'babel.config.js')]

if 'security_password_salt' not in env:
    env.security_password_salt = environ.get('security_password_salt',
                                             env.secret_key)

if 'sqlalchemy_database_uri' not in env:
    env.sqlalchemy_database_uri = environ.get('sqlalchemy_database_uri',
                                              env.database_url)

env_upper = {key.upper(): env[key] for key in env}
env.update(env_upper)

for key in env_upper:
    environ[key] = str(env_upper[key])


def start(app):

    if 'name' not in config:
        config.name = app.import_name

    env.postcss_extra_args = ['--config', join(app.root_path, env.cache_dir)]
    env.POSTCSS_EXTRA_ARGS = env.postcss_extra_args

    app.config.update(env)

    if app.config['PROXIES']:
        app.wsgi_app = ProxyFix(app.wsgi_app,
                                x_for=app.config['PROXIES'],
                                x_proto=app.config['PROXIES'])

    app.config = Config(app.config)

    Path(env.cache_dir).mkdir(exist_ok=True)
    Path(join(env.cache_dir, '.empty')).touch()

    file = open(join(env.cache_dir, 'postcss.config.js'), 'w')
    file.write('module.exports = %s' % (postcss.toJSON(),))

    file = open(join(env.cache_dir, 'babel.cfg'), 'w')

    for format in babel:
        for source in babel[format]:

            file.write('[%s: %s]\n' % (format, source))

            for option in babel[format][source]:

                if isinstance(babel[format][source][option], list):
                    babel[format][source][option] = (
                        ','.join(babel[format][source][option]))

                file.write('%s = %s\n' % (option,
                                          babel[format][source][option]))

            file.write('\n')

    return app
