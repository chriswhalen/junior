from os.path import split
from re import sub

from jinja2 import Environment

from webassets.filter import Filter, register_filter as register

from . import join
from .config import jinja_options, vendor
from .context import context


@register
class Hamlish(Filter):

    name = 'hamlish'

    def input(self, _in, _out, **params):

        _out.write(Environment(**jinja_options).hamlish_from_string(
            _in.read(), globals=context).render())


@register
class HandleEmpty(Filter):

    name = 'handle_empty'

    def input(self, _in, _out, **params):

        style = _in.read()

        if not len(style.strip()):
            style = '/* */'

        _out.write(style)


@register
class Require(Filter):

    name = 'require'

    def require(self, match):

        missing = False

        path = list(split(match.groups()[-1]))
        path[-1] = '%s.js' % (path[-1],)

        prefix_path = [p for p in path]
        prefix_path[-1] = '_%s' % (prefix_path[-1],)

        try:
            return open(join(self.path, *prefix_path), 'r').read()

        except FileNotFoundError:

            try:
                return open(join(self.path, *path), 'r').read()

            except FileNotFoundError:

                name = match.groups()[0]
                path = join(self.ctx.app.root_path, 'node_modules', name)

                try:
                    return open(join(path, vendor.scripts[name]), 'r').read()

                except (FileNotFoundError, KeyError, TypeError):

                    try:
                        return open(join(path, '%s.js' % (name,)), 'r').read()

                    except FileNotFoundError:

                        try:
                            return open(join(path, 'dist', '%s.js' % (name,)),
                                        'r').read()

                        except FileNotFoundError:

                            try:
                                return open(join(path, '%s.min.js' % (name,)),
                                            'r').read()

                            except FileNotFoundError:

                                try:
                                    return open(join(path, 'dist',
                                                     '%s.min.js' % (name,)),
                                                'r').read()

                                except FileNotFoundError:

                                    missing = True

        if missing:
            raise FileNotFoundError("require('%s')" % (name,))

    def input(self, _in, _out, **params):

        self.path = split(params['source_path'])[0]
        for line in _in.readlines():

            _out.write(sub(r'^\s*require\(\s*["\'](.*?)["\']\s*\)\s*;?',
                           self.require,
                           line))


@register
class ImportSSS(Filter):

    name = 'import_sss'

    def _import(self, match):

        name = list(split(match.groups()[0]))[-1]

        path = '%s.sss' % (name,)
        prefix_path = '_%s' % (path,)

        try:
            return open(join(self.path, prefix_path), 'r').read()

        except FileNotFoundError:

            try:
                return open(join(self.path, path), 'r').read()

            except FileNotFoundError:

                return "@import '%s'" % (name,)

    def input(self, _in, _out, **params):

        self.path = split(params['source_path'])[0]
        for line in _in.readlines():

            _out.write(sub(r'^\s*@import\s+["\'](.*?)["\']\s*[;\n]',
                           self._import,
                           line))


@register
class ImportCSS(Filter):

    name = 'import_css'

    def _import(self, match):

        missing = False

        name = match.groups()[0]
        path = join(self.ctx.app.root_path, 'node_modules', name)

        try:
            return open(join(path, vendor.styles[name]), 'r').read()

        except (FileNotFoundError, KeyError):

            try:
                return open(join(path, '%s.css' % (name,)), 'r').read()

            except FileNotFoundError:

                try:
                    return open(join(path, 'dist', '%s.css' % (name,)),
                                'r').read()

                except FileNotFoundError:

                    try:
                        return open(join(path, '%s.min.css' % (name,)),
                                    'r').read()

                    except FileNotFoundError:

                        try:
                            return open(join(path, 'dist',
                                             '%s.min.css' % (name,)),
                                        'r').read()

                        except FileNotFoundError:

                            missing = True

        if missing:
            raise FileNotFoundError("@import '%s'" % (name,))

    def input(self, _in, _out, **params):

        self.path = split(params['source_path'])[0]
        for line in _in.readlines():

            _out.write(sub(r'^\s*@import\s+["\'](.*?)["\']\s*[;\n]',
                           self._import,
                           line))


@register
class FixBabelHelpers(Filter):

    name = 'fix_babel_helpers'

    def fix_babel_helpers(self, match):

        return ''

    def input(self, _in, _out, **params):

        for line in _in.readlines():

            _out.write(sub(r'babelHelpers\["(.*?)"\]',
                           self.fix_babel_helpers,
                           line))


@register
class Strip(Filter):

    name = 'strip'

    def output(self, _in, _out, **params):

        for line in _in.readlines():

            if len(line.strip()):
                _out.write(line)


@register
class WrapScript(Filter):

    name = 'wrap_script'

    def output(self, _in, _out, **params):

        script = _in.read()

        if len(script.strip()) > len('"use strict";'):
            _out.write('<script async>\n%s\n</script>' % (script,))


@register
class WrapStyle(Filter):

    name = 'wrap_style'

    def output(self, _in, _out, **params):

        style = _in.read()

        if len(style.strip()):
            _out.write('<style>\n%s\n</style>' % (style,))
