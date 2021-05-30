from . import dt, to
from .config import config
from .util import X, _


def asset(name):
    '''
    Get the URL for an asset ``name``.

    :param name: our asset's filename.
    '''

    try:
        return to('static', filename=name)

    except (AttributeError, RuntimeError):
        return f'/static/{name}'


def title(text=None):
    '''
    Append the site's name to ``text`` to give us a page title.
    If ``text`` is ``None``, :func:`title` returns the site's name.

    :param text: our page's title text.
    '''

    return (f'{text} | {config.name}' if text else config.name)


def process(key=None):
    '''
    A wrapper around :attr:`context`.

    :param key: the key to fetch from :attr:`context`.
    '''

    return context[key] if key in context else None if key else context


filters = (_, X, asset, title)

filters = X(zip([f.__name__ for f in filters], filters))

#: Our :class:`~junior.Application` context, as exposed to our templates.
context = X(
    dt=dt,
    now=dt.now(),
    config=config
)

context.update(filters)
