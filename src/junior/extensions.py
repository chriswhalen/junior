from re import compile

from jinja2.exceptions import TemplateSyntaxError
from jinja2.ext import Extension
from jinja2.lexer import Token, count_newlines


class HamlBabel(Extension):

    inner = compile(r'\\?[()]')

    outer = compile(r'\\?(_|__|gettext|ngettext|lazy_gettext|lazy_ngettext)\(')

    def filter_stream(self, stream):

        parens = 0
        method = None

        for token in stream:

            if token.type != 'data':

                yield token
                continue

            line = token.lineno
            pos = 0

            while True:

                if not parens:
                    match = self.outer.search(token.value, pos)

                else:
                    match = self.inner.search(token.value, pos)

                if match is None:
                    break

                new_pos = match.start()

                if new_pos > pos:

                    parsed = token.value[pos:new_pos]

                    if method in ('__', 'ngettext', 'lazy_ngettext'):

                        segments = parsed.split('||')

                        # print(segments)

                        yield Token(line, 'data', segments[0])
                        yield Token(line, 'block_begin', None)
                        yield Token(line, 'name', 'pluralize')
                        yield Token(line, 'block_end', None)

                        for segment in segments[1:]:

                            yield Token(line, 'data', segment)

                    else:
                        yield Token(line, 'data', parsed)

                    line += count_newlines(parsed)

                group = match.group()

                if group[0] == '\\':
                    yield Token(line, 'data', group[1:])

                elif not parens:

                    method = group[:-1]

                    yield Token(line, 'block_begin', None)
                    yield Token(line, 'name', 'trans')
                    yield Token(line, 'block_end', None)
                    parens = 1

                else:
                    if group == '(' or parens > 1:
                        yield Token(line, 'data', group)

                    parens += group == ')' and -1 or 1

                    if not parens:
                        yield Token(line, 'block_begin', None)
                        yield Token(line, 'name', 'endtrans')
                        yield Token(line, 'block_end', None)

                pos = match.end()

            if pos < len(token.value):

                # print(token.value)
                yield Token(line, 'data', token.value[pos:])

        if parens:

            raise TemplateSyntaxError(
                'Unmatched parentheses in gettext expression',
                token.line, stream.name, stream.filename)
