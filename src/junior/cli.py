from os import system
from pathlib import Path
from re import sub
from textwrap import fill

from autopep8 import fix_code

import click

from flask.cli import with_appcontext

from flask_alembic import alembic_click
from flask_alembic.cli import base as alembic

import konch

from . import dt, join
from .config import config, env
from .db import AlembicVersion
from .errors import ProgrammingError
from .util import echo


def store_migrations(start=0):

    start = int(start, 10)

    Path(env.migrations_path).mkdir(exist_ok=True)

    for migration in Path(join(env.cache_path, 'migrations')).glob('*_*.py'):

        if int(migration.name[:4], 10) >= start:

            with open(migration) as source:
                with open(join(env.migrations_path,
                               migration.name), 'w') as destination:

                    destination.write(fix_code(
                       sub('# ###.*?###', '', source.read())))


@alembic_click.command('destroy')
@click.option('-f', '--force', is_flag=True, default=False,
              show_default=True, help='Do not prompt before destroying data.')
@with_appcontext
def destroy_db(force):
    '''Drop all records and tables.'''

    if not force:
        click.confirm(click.style(
            '\nAre you sure you want to drop all records and tables?',
            fg='bright_red', bold=True), abort=True)

    from flask.globals import _app_ctx_stack
    app = _app_ctx_stack.top.app

    app.db.metadata.bind = app.db.engine
    app.db.metadata.drop_all()

    try:
        AlembicVersion.drop()

    except ProgrammingError:
        pass


@alembic_click.command('revision')
@click.argument('message')
@click.option('--empty', is_flag=True, help='Create empty script.')
@click.option('-b', '--branch', default='default',
              help='Use this independent branch name.')
@click.option('-p', '--parent', multiple=True, default=['head'],
              help='Parent revision(s) of this revision.')
@click.option('--splice', is_flag=True, help='Allow non-head parent revision.')
@click.option('-d', '--depend', multiple=True,
              help='Revision(s) this revision depends on.')
@click.option('-l', '--label', multiple=True,
              help='Label(s) to apply to the revision.')
def revision_db(message, empty, branch, parent, splice, depend, label):
    '''Create new migration.'''

    alembic.revision(message, empty, branch, parent,
                     splice, depend, label, None)

    store_migrations(alembic.get_alembic().rev_id())


@alembic_click.command('merge')
@click.argument('revisions', nargs=-1)
@click.option('-m', '--message')
@click.option('-l', '--label', multiple=True,
              help='Label(s) to apply to the revision.')
def merge_db(revisions, message, label):
    '''Create merge revision.'''

    alembic.merge(revisions, message, label)

    store_migrations(alembic.get_alembic().rev_id())


@click.group()
def locale():
    '''Extract and compile translations.'''


@locale.command('extract')
def extract_locale():
    '''Extract messages into a POT template.'''
    system('pybabel extract -F %s/babel.cfg -k X -o messages.pot .'
           % (env.cache_path,))


@locale.command('create')
@click.argument('name')
def create_locale(name):
    '''Create a new locale.'''
    system('pybabel init -i messages.pot -d translations -l %s' % (name,))


@locale.command('update')
def update_locale():
    '''Update existing locales to match the current POT template.'''
    system('pybabel update -i messages.pot -d translations')


@locale.command('compile')
def compile_locale():
    '''Compile all locales.'''
    system('pybabel compile -d translations')


@click.group()
def queue():
    '''Manage the task queue.'''


@queue.command('run')
@click.argument('name', required=False)
@with_appcontext
def run_queue(name):
    '''Start the task worker.

    NAME is the name of your application's queue module.
    When not provided, it will default to your app module's "queue" property.
    '''

    from flask.globals import _app_ctx_stack
    app = _app_ctx_stack.top.app

    if (name is None):
        name = '%s.queue' % (app.import_name,)

    system('celery worker -E -A %s' % (name,))


@click.command()
@click.argument('name', required=False)
@click.option('-b', '--bind', default='127.0.0.1:8000', show_default=True,
              help='Bind to address:port.')
@click.option('-w', '--workers', default=4, show_default=True,
              help='Number of worker processes.')
@click.option('-r', '--reload', is_flag=True, default=False,
              show_default=True, help='Restart the server when code changes.')
@click.option('-p', '--preload', is_flag=True, default=False,
              show_default=True,
              help='Preload the application before starting the server.')
@click.option('--key', help='Path the the SSL private key.')
@click.option('--cert', help='Path the the SSL certificate.')
@click.option('--ca', help='Path the the SSL certificate authority (CA).')
@with_appcontext
def run(name, bind, workers, reload, preload, key, cert, ca):
    '''Start a gunicorn server.

    NAME is the name of your application module.
    When not provided, it will be autodetected.
    '''

    from flask.globals import _app_ctx_stack
    app = _app_ctx_stack.top.app

    if (name is None):
        name = app.import_name

    options = ''

    if (reload):
        options += '--reload '

    if (preload):
        options += '--preload '

    if (key):
        options += '--keyfile %s ' % (key,)

    if (cert):
        options += '--certfile %s ' % (cert,)

    if (ca):
        options += '--ca-certs %s ' % (ca,)

    if app.env == 'development':
        options += '--reload'

    banner = app.name

    if config.name != app.name:
        banner = '%s :: %s' % (config.name, app.name)

    banner = click.style(banner, fg='bright_green', bold=True)
    banner = '\n%s\n%s\n' % (banner, click.style(app.env, fg='bright_blue'))

    print(banner)

    system('gunicorn -b %s -w %s -n %s %s %s' %
           (bind, workers, name, options, name))


@click.command()
@with_appcontext
def shell():
    '''Start a shell in the app context.'''

    def context_format(ctx):

        return fill(', '.join(sorted(ctx.keys())), 96)

    def shell_echo(*args):

        print('%s\n' % echo('', '', *args, _print=False))

    import junior
    import readline
    import rlcompleter                                                  # noqa

    from flask.globals import _app_ctx_stack
    app = _app_ctx_stack.top.app

    shell_context = {'app': app}

    imports = ('Application', 'Flask', 'Model', 'Path', 'Request', 'Resource',
               'Response', 'User', 'X', '_', 'api', 'b', 'cache', 'collapse',
               'components', 'config', 'context', 'db', 'dt', 'env', 'error',
               'join', 'jsonify', 'model', 'queue', 'redirect', 'render',
               'resource', 'response', 'schemas', 'split', 'store',
               'timestamps', 'web')

    for name in imports:
        shell_context[name] = getattr(junior, name)

    shell_context.update(app.make_shell_context())
    shell_context['echo'] = shell_echo
    shell_context['now'] = dt.now

    banner = app.name

    if config.name != app.name:
        banner = '%s :: %s' % (config.name, app.name)

    banner = click.style(banner, fg='bright_green', bold=True)
    banner = '%s\n%s\n' % (banner, click.style(app.env, fg='bright_blue'))

    readline.parse_and_bind('tab: complete')
    readline.read_history_file(join(env.cache_path, 'history'))

    konch.start(shell='auto', context=shell_context,
                context_format=context_format, banner=banner)

    readline.write_history_file(join(env.cache_path, 'history'))


def start(app):

    app.cli.add_command(locale)
    app.cli.add_command(queue)
