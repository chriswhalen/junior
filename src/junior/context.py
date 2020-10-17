from . import dt, to
from .config import config
from .util import X, _


def asset(name):

    try:
        return to('static', filename=name)

    except AttributeError:
        return '%s/%s' % ('/static', name)


def title(text=None):

    return ('%s | %s' % (text, config.name) if text else config.name)


def process(key=None):

    return context[key] if key in context else None if key else context


filters = (_, X, asset, title)

filters = _(zip([f.__name__ for f in filters], filters))

context = _(
    dt=dt,
    now=dt.now(),
    config=config
)

context.update(filters)
