from os.path import split
from re import sub

from jinja2 import Environment

from webassets.filter import Filter, register_filter as register

from . import join
from .config import jinja, vendor
from .context import context


@register
class Hamlish(Filter):
    '''
    A :class:`~webassets.filter.Filter` to parse a
    `HAML <https://haml.info/>`_ template into HTML markup.
    '''

    name = 'hamlish'

    def input(self, _in, _out, **params):

        _out.write(Environment(**jinja).hamlish_from_string(
            _in.read(), globals=context).render())


@register
class HandleEmpty(Filter):
    '''
    A :class:`~webassets.filter.Filter` adding an empty comment
    to an empty source file, to avoid a later filter failing to
    parse the empty document.
    '''

    name = 'handle_empty'

    def input(self, _in, _out, **params):

        style = _in.read()

        if not len(style.strip()):
            style = '/* */'

        _out.write(style)


@register
class Require(Filter):
    '''
    A :class:`~webassets.filter.Filter` adding a basic ``require`` keyword
    clone to our JavaScript source files.
    '''

    name = 'require'

    def require(self, match):

        name = match.groups()[0]

        path = list(split(match.groups()[-1]))
        path[-1] = f'{path[-1]}.js'

        prefix_path = [p for p in path]
        prefix_path[-1] = f'_{prefix_path[-1]}'

        node_path = join(self.ctx.app.root_path, 'node_modules', name)
        vendor_path = f'{name}.js'

        try:
            vendor_path = vendor.scripts[name]

        except (FileNotFoundError, KeyError, TypeError):
            pass

        order = (
            (self.path, *prefix_path),
            (self.path, *path),
            (node_path, vendor_path),
            (node_path, f'{name}.js'),
            (node_path, f'{name}.min.js'),
            (node_path, 'dist', f'{name}.js'),
            (node_path, 'dist', f'{name}.min.js'),
        )

        for path in order:

            try:
                return open(join(*path), 'r').read()

            except FileNotFoundError:
                pass

            raise FileNotFoundError(f'require("{name}")')

    def input(self, _in, _out, **params):

        self.path = split(params['source_path'])[0]

        source = _in.readlines()
        output = []

        while output == []:

            for line in source:
                output.append(
                    sub(r'^\s*require\(\s*["\'](.*?)["\']\s*\)\s*;?',
                        self.require, line))

            if output != source:
                source = output
                output = []

        _out.writelines(output)


@register
class ImportSSS(Filter):
    '''
    A :class:`~webassets.filter.Filter` adding a basic ``import`` keyword
    clone to our `SugarSS <https://github.com/postcss/sugarss>`_ source files.
    '''

    name = 'import_sss'

    def _import(self, match):

        name = list(split(match.groups()[0]))[-1]

        path = f'{name}.sss'
        prefix_path = f'_{path}'

        order = (
            (self.path, prefix_path),
            (self.path, path),
        )

        for path in order:

            try:
                return open(join(*path), 'r').read()

            except FileNotFoundError:
                pass

        return f"@import '{name}'"

    def input(self, _in, _out, **params):

        self.path = split(params['source_path'])[0]

        source = _in.readlines()
        output = []

        while output == []:

            for line in source:
                output.append(sub(r'^\s*@import\s+["\'](.+?)["\']\s*[;\n]',
                                  self._import, line))

            if output != source:
                source = output
                output = []

        _out.writelines(output)


@register
class ImportCSS(Filter):
    '''
    A :class:`~webassets.filter.Filter` adding a basic ``import`` keyword
    clone to our CSS source files.
    '''

    name = 'import_css'

    def _import(self, match):

        name = match.groups()[0]

        path = list(split(match.groups()[-1]))
        path[-1] = f'{path[-1]}.css'

        prefix_path = [p for p in path]
        prefix_path[-1] = f'_{prefix_path[-1]}'

        node_path = join(self.ctx.app.root_path, 'node_modules', name)
        vendor_path = f'{name}.css'

        try:
            vendor_path = vendor.styles[name]

        except (FileNotFoundError, KeyError, TypeError):
            pass

        order = (
            (self.path, *prefix_path),
            (self.path, *path),
            (node_path, vendor_path),
            (node_path, f'{name}.css'),
            (node_path, f'{name}.min.css'),
            (node_path, 'dist', f'{name}.css'),
            (node_path, 'dist', f'{name}.min.css'),
        )

        for path in order:

            try:
                return open(join(*path), 'r').read()

            except FileNotFoundError:
                pass

            raise FileNotFoundError(f'require("{name}")')

    def input(self, _in, _out, **params):

        self.path = split(params['source_path'])[0]

        source = _in.readlines()
        output = []

        while output == []:

            for line in source:
                output.append(sub(r'^\s*@import\s+["\'](.+?)["\']\s*[;\n]',
                                  self._import, line))

            if output != source:
                source = output
                output = []

        _out.writelines(output)


@register
class Strip(Filter):
    '''A :class:`~webassets.filter.Filter` to strip blank lines.'''

    name = 'strip'

    def output(self, _in, _out, **params):

        for line in _in.readlines():

            if len(line.strip()):
                _out.write(line)


@register
class WrapScript(Filter):
    '''
    A :class:`~webassets.filter.Filter` to wrap a JavaScript source document
    in ``<script>`` tags for us to embed it into markup.
    '''

    name = 'wrap_script'

    def output(self, _in, _out, **params):

        script = _in.read()

        if len(script.strip()) > len('"use strict";'):
            _out.write(f'<script async>\n{script}\n</script>')


@register
class WrapStyle(Filter):

    '''
    A :class:`~webassets.filter.Filter` to wrap a CSS stylesheet document
    in ``<style>`` tags for us to embed it into markup.
    '''

    name = 'wrap_style'

    def output(self, _in, _out, **params):

        style = _in.read()

        if len(style.strip()):
            _out.write(f'<style>\n{style}\n</style>')
