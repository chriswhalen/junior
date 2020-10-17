from os import listdir
from os.path import exists, isdir

from . import Blueprint, Bundle, join, render
from .errors import BundleError, TemplateNotFound, error, handle


components = Blueprint('components', __name__, template_folder='../components')

components.url_prefix = '/_/'


def defaults():

    from . import _components

    @_components.components.route('<path:path>')
    def __default(path):

        try:
            return render('%s.html' % (path,))

        except TemplateNotFound:
            return '<!-- not found: %s -->' % (path,), 404

    @handle(_components.components.url_prefix)
    @_components.components.errorhandler(Exception)
    def __error(exception):

        message = error(exception)
        return '<!-- error: %s -->' % (message.name.lower(),), message.code


def start(app):

    from . import _components

    names = []

    try:
        names = [c if isdir(join('components', c)) else None
                 for c in listdir('components')]

    except FileNotFoundError:
        pass

    for name in names:

        if not name:
            continue

        bundles = []
        path = join('components', name, '')

        if exists('%s%s' % (path, 'template.haml')):

            bundles.append(Bundle('%s%s' % (path, 'template.haml'),
                                  filters=('hamlish')))

        if exists('%s%s' % (path, 'style.sss')):

            bundles.append(Bundle('%s%s' % (path, 'style.sss'),
                                  filters=('handle_empty',
                                           'postcss',
                                           'wrap_style')))

        if exists('%s%s' % (path, 'script.js')):

            bundles.append(Bundle('%s%s' % (path, 'script.js'),
                                  filters=('require',
                                           'babel',
                                           'wrap_script')))

        try:
            app.assets.register(name,
                                *bundles,
                                filters='strip',
                                output=join('components',
                                            '%s.html' % (name,)))

        except BundleError:
            pass

    _components.defaults()

    app.register_blueprint(_components.components,
                           url_prefix=_components.components.url_prefix)

    return app
