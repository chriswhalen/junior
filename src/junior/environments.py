from jinja2 import Environment, FileSystemLoader

from . import join, root_path
from .config import jinja_options
from .context import context, filters
from .util import _


options = _(jinja_options)
options.loader = FileSystemLoader(join(root_path, 'templates'))

templates = Environment(**options)

templates.hamlish_enable_div_shortcut = True
templates.hamlish_mode = 'indented'

templates.filters.update(filters)
templates.globals.update(context)
