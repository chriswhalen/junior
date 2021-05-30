from jinja2 import Environment, FileSystemLoader

from . import __root_path, join
from .config import jinja
from .context import context, filters
from .util import X


options = X(jinja)
options.loader = FileSystemLoader(join(__root_path, 'templates'))

#: An :class:`~jinja2.Environment` to render our templates.
templates = Environment(**options)

templates.hamlish_enable_div_shortcut = True
templates.hamlish_mode = 'indented'

templates.filters.update(filters)
templates.globals.update(context)
