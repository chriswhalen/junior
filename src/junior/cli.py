from os import system

import click

from flask.cli import with_appcontext

import konch

from .config import env
from .util import dump


@click.group()
def locale():
    """Extract and compile translations."""


@locale.command('extract')
def extract_locale():
    """Extract messages into a POT template."""
    system('pybabel extract -F %s/babel.cfg -k X -o messages.pot .'
           % (env.cache_dir,))


@locale.command('create')
@click.argument('name')
def create_locale(name):
    """Create a new locale."""
    system('pybabel init -i messages.pot -d translations -l %s' % (name,))


@locale.command('update')
def update_locale():
    """Update existing locales to match the current POT template."""
    system('pybabel update -i messages.pot -d translations')


@locale.command('compile')
def compile_locale():
    """Compile all locales."""
    system('pybabel compile -d translations')


@click.group()
def queue():
    """Manage the task queue."""


@queue.command('run')
@click.argument('name', required=False)
@with_appcontext
def run_queue(name):
    """Start the task worker.

    NAME is the name of your application's queue module. If not provided,
    this defaults to the "queue" property of your app module.
    """

    from flask.globals import _app_ctx_stack
    app = _app_ctx_stack.top.app

    if (name is None):
        name = '%s.queue' % (app.import_name,)

    system('celery worker -E -A %s' % (name,))


@click.command('run')
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
    """Start a gunicorn server.

    NAME is the name of your application module. If not provided,
    it will be autodetected.
    """

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

    system('gunicorn -b %s -w %s -n %s %s %s' %
           (bind, workers, name, options, name))


@click.command()
@with_appcontext
def shell():
    """Start a shell in the app context."""

    def context_format(ctx):

        return ', '.join(sorted(ctx.keys()))

    def shell_dump(*args):

        print(dump(*args, _print=False))

    from flask.globals import _app_ctx_stack
    app = _app_ctx_stack.top.app

    shell_context = {'app': app}

    imports = ('Application', 'Blueprint', 'Flask', 'Request', 'Resource',
               'Response', 'X', '_', 'api', 'cache', 'components', 'config',
               'context', 'db', 'dt', 'emit', 'env', 'error', 'forget', 'g',
               'join', 'jsonify', 'memo', 'model', 'on', 'queue', 'redirect',
               'register', 'render', 'request', 'resource', 'response',
               'schemas', 'send', 'session', 'socket', 'split', 'store', 'to',
               'web')

    import junior

    for name in imports:
        shell_context[name] = getattr(junior, name)

    shell_context.update(app.make_shell_context())
    shell_context['dump'] = shell_dump

    konch.start(shell='auto',
                context=shell_context,
                context_format=context_format,
                banner=click.style('%s :: %s\n' %
                                   (app.import_name, app.env), bold=True),
                )


def start(app):

    app.cli.add_command(locale)
    app.cli.add_command(queue)
