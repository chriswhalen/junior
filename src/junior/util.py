from pprint import pformat
from re import sub

from flask_babel import lazy_gettext, lazy_ngettext

from munch import DefaultMunch as Munch

from toml import dumps, loads

from . import dt


Munch.__name__ = 'X'
Munch.__repr__ = lambda self: f'X{pformat(self.__dict__)}'

Munch.toTOML = lambda self: dumps(self)
Munch.fromTOML = lambda data: Munch.fromDict(loads(data))


def X(_dict={}, **params):
    '''
    :class:`X` is a `Munch <https://pypi.org/project/munch/>`_.
    :meth:`X` is also a function that returns a new :class:`X`
    from a ``dict`` or a set of parameters.

    :class:`Munch` is "`a dictionary that supports attribute-style access`".
    :meth:`X` offers us a few options::

        user = X(id=1, name='sheila', email='s@mail.ca')
        user                            # we can create a new X from parameters
            X{'email': 's@mail.ca', 'id': 1, 'name': 'sheila'}
        user['id']           # we can index by the usual brace attribute syntax
            1
        user.name                        # or dot syntax if the key is a string
            'sheila'

        book = X({'title': 'thing explainer', 'author': 'randall monroe'})
        book                  # we can also create a new X by wrapping any dict
            X{'author': 'randall monroe', 'title': 'thing explainer'}
        len(book)            # just like a dict, an X's length is its key count
            2
        book.pages                              # we didn't define this one yet
            None

    Missing keys return ``None``; :class:`X` prefers to fail silently.

    :class:`X` also gives us the :meth:`toTOML` and :meth:`fromTOML` methods
    to help serialize to and deserialize from the
    `TOML <https://toml.io/>`_ format.
    Their signatures and behaviour match the :meth:`toJSON`/:meth:`fromJSON`
    and :meth:`toYAML`/:meth:`fromYAML` methods inherited from :class:`Munch`.

    :param _dict: a ``dict`` to :class:`X`-ify
    '''

    params.update(_dict)
    return Munch.fromDict(params, None)


def _(string, plural_string=None, count=1):
    '''
    Mark a ``string`` for translation.
    :meth:`_` is wrapper for :func:`~flask_babel.lazy_gettext`.

    :param string: the string we want to translate.
    :param plural_string: the plural form alternative of ``string``.
    :param count: the number of subjects, for deciding if we should pluralize.
    '''

    if plural_string:
        return lazy_ngettext(string, plural_string, count)

    return lazy_gettext(string)


def b(value, length=8, order='big', encoding='utf-8'):
    '''
    Cast an ``int`` or ``str`` ``value`` to a byte sequence::

        b(46290)
            b'\\x00\\x00\\x00\\x00\\x00\\x00\\xb4\\xd2'
        b(46290, order='little')
            b'\\xd2\\xb4\\x00\\x00\\x00\\x00\\x00\\x00'
        b(511, 2)
            b'\\x01\\xff'
        b('nice')
            b'nice'
        b('你好欢迎')
            b'\\xe4\\xbd\\xa0\\xe5\\xa5\\xbd\\xe6\\xac\\xa2\\xe8\\xbf\\x8e'
        b('你好欢迎', encoding='ascii')
            # UnicodeEncodeError: 'ascii' codec can't encode characters
            # in position 0-3: ordinal not in range(128)

    :param value: the data we want to cast.
    :param length: the length we'll use to cast ``value`` from ``int``.
    :param order: the endian-ness we'll use to cast ``value`` from ``int``.
    :param encoding: the encoding we'll use to cast ``value`` from ``str``.
    '''

    try:
        if int(value) == value:
            return int(value).to_bytes(length, order)

    except Exception:
        pass

    try:
        return bytes(value, encoding)

    except Exception:
        return bytes(str(value), encoding)


def flatten(data, delimiter='_', reverse=False):
    '''
    Flatten a nested ``dict`` or :class:`X` ``data``,
    joining its key names with ``delimiter``::

        flatten({'first':  {'one': 0, 'two': 1},
                 'second': {'one': 2, 'two': 3}})
            {'first_one': 0, 'first_two': 1, 'second_one': 2, 'second_two': 3}

        flatten(X(name=X(first='al', middle='bert', last='catt')), '.', True)
            X{'first.name': 'al', 'last.name': 'catt', 'middle.name': 'bert'}

    :param data: the ``dict`` or :class:`X` we want to flatten.
    :param delimiter: the ``str`` we'll use to join our nested key names.
    :param reverse: join our key names in reverse order?
    '''

    values = {}

    if isinstance(data, Munch):
        values = X()

    for key in data:
        if isinstance(data[key], dict):
            inner_data = flatten(data[key], delimiter)
            for inner_key in inner_data:
                full_key = (f'{inner_key}{delimiter}{key}' if reverse else
                            f'{key}{delimiter}{inner_key}')
                values[full_key] = inner_data[inner_key]
        else:
            values[key] = data[key]

    return values


def echo(*args, _print=True):
    '''
    Display the internals of a set of ``args``.
    We can use :meth:`echo` to render a debug ``str`` dump of any object(s),
    printing it to the console by default.

    :param _print: print our result to the console?
    '''

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
