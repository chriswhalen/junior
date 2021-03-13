from pprint import pformat
from re import sub

from flask_babel import lazy_gettext, lazy_ngettext

from munch import DefaultMunch as Munch

from toml import dumps, loads

from . import dt


Munch.__name__ = 'X'
Munch.__repr__ = lambda self: 'X%s' % (pformat(self.__dict__),)

Munch.toTOML = lambda self: dumps(self)
Munch.fromTOML = lambda data: Munch.fromDict(loads(data))


def X(_dict={}, **params):

    params.update(_dict)
    return Munch.fromDict(params, None)


def _(string, plural_string=None, count=1):

    if plural_string:
        return lazy_ngettext(string, plural_string, count)

    return lazy_gettext(string)


def b(value, length=8, order='big', encoding='utf-8'):

    try:
        if int(value) == value:
            return int(value).to_bytes(length, order)

    except Exception:
        pass

    try:
        return bytes(value, encoding)

    except Exception:
        return bytes(str(value), encoding)


def collapse(data, delimiter='_'):

    values = X()

    for key in data:
        if isinstance(data[key], dict):
            inner_data = collapse(data[key], delimiter)
            for inner_key in inner_data:
                full_key = "%s%s%s" % (key, delimiter, inner_key)
                values[full_key] = inner_data[inner_key]
        else:
            values[key] = data[key]

    return values


def echo(*args, _print=True):

    output = ''

    for arg in args:

        try:
            if arg.__dict__:
                output += pformat(arg.__dict__, 2)

            else:
                output += pformat(arg, 2)

        except AttributeError:
            output += pformat(arg, 2)

        output += '\n'

    output = ('[%s] %s' % (str(dt.now()),
              sub(r'[:,]', '\n ',
                  sub(r'[\'"\[\]\{\}<>]', ' ',
                      (output[:-1].replace(
                        ', ', ' ').replace(
                        '    ', '').replace(
                        ': [', '\n\n')))).replace(
                        '     ', '    '))).replace(
                        '   ', '  ')

    if _print:
        print(output, flush=True)

    return output
