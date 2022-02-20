from jinja2 import Environment, FileSystemLoader

from . import join, root_path
from .config import env, jinja_options
from .context import context, filters
from .util import X


options = X(jinja_options)
options.loader = FileSystemLoader(join(root_path, env.templates_path))

templates = Environment(**options)

templates.hamlish_enable_div_shortcut = True
templates.hamlish_mode = 'indented'

templates.filters.update(filters)
templates.globals.update(context)
