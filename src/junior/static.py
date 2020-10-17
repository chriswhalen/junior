from . import Bundle, __root_path, join
from .errors import BundleError


def start(app):

    app.assets._named_bundles = {}

    try:
        app.assets.register('app_css', Bundle(

            join('styles', 'app.sss'),
            depends=(join('styles', '*.sss')),
            filters=('import_sss', 'handle_empty', 'postcss', 'import_css',
                     'cleancss'),
            output=join(app._static_folder, 'app.css')
        ))

    except BundleError:
        pass

    try:
        app.assets.register('app_js', Bundle(

            Bundle(join(__root_path, 'scripts', 'junior.js')),

            Bundle(join('scripts', 'app.js'),
                   depends=(join('scripts', '*.js'),),
                   filters=('require', 'babel', 'rjsmin')),

            output=join(app._static_folder, 'app.js')
        ))

    except BundleError:
        pass

    return app
