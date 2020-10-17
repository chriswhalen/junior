from pprint import pformat

from flask_babel import lazy_gettext, lazy_ngettext

from munch import DefaultMunch as Munch

from toml import dumps, loads


Munch.__name__ = '_'

Munch.toTOML = lambda self: dumps(self)
Munch.fromTOML = lambda data: Munch.fromDict(loads(data))


def _(_dict={}, **params):

    params.update(_dict)
    return Munch.fromDict(params, None)


def X(string, plural_string=None, count=1):

    if plural_string:
        return lazy_ngettext(string, plural_string, count)

    return lazy_gettext(string)


def collapse(data, delimiter='_'):

    values = _()

    for key in data:
        if isinstance(data[key], dict):
            inner_data = collapse(data[key], delimiter)
            for inner_key in inner_data:
                full_key = "%s%s%s" % (key, delimiter, inner_key)
                values[full_key] = inner_data[inner_key]
        else:
            values[key] = data[key]

    return values


def dump(*args, _print=True):

    string = '\n'

    for arg in args:

        try:
            if arg.__dict__:
                string += pformat(arg.__dict__)

            else:
                string += pformat(arg)

        except AttributeError:
            string += pformat(arg)

        string += '\n'

    if _print:
        print(string)

    return string
