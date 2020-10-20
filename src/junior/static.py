from pathlib import Path

from . import Bundle, __root_path, join
from .config import env
from .errors import BundleError


def start(app):

    app.assets._named_bundles = {}

    try:

        if Path(join('styles', 'app.sss')).is_file():

            app.assets.register('app_css', Bundle(

                join('styles', 'app.sss'),
                depends=(join('styles', '*.sss')),
                filters=('import_sss', 'handle_empty', 'postcss', 'import_css',
                         'cleancss'),
                output=join(app._static_folder, 'app.css')
            ))

        else:

            app.assets.register('app_css', Bundle(
                join(env.cache_dir, '.empty'),
                output=join(app._static_folder, 'app.css')
            ))

    except BundleError:
        pass

    try:

        if Path(join('scripts', 'app.js')).is_file():

            app.assets.register('app_js', Bundle(

                Bundle(join(__root_path, 'scripts', 'junior.js')),

                Bundle(join('scripts', 'app.js'),
                       depends=(join('scripts', '*.js'),),
                       filters=('require', 'rjsmin')),

                output=join(app._static_folder, 'app.js')
            ))

        else:

            app.assets.register('app_js', Bundle(

                join(__root_path, 'scripts', 'junior.js'),
                output=join(app._static_folder, 'app.js')
            ))

    except BundleError:
        pass

    return app
