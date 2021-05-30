from re import sub
from sys import exc_info
from traceback import format_tb

from jinja2.exceptions import (                                         # noqa
    FilterArgumentError, SecurityError, TemplateAssertionError, TemplateError,
    TemplateNotFound, TemplateRuntimeError, TemplateSyntaxError,
    TemplatesNotFound, UndefinedError)

from sqlalchemy.exc import (                                            # noqa
    AmbiguousForeignKeysError, ArgumentError, CircularDependencyError,
    CompileError, DBAPIError, DataError, DatabaseError, DisconnectionError,
    IdentifierError, IntegrityError, InterfaceError, InternalError,
    InvalidRequestError, NoForeignKeysError, NoInspectionAvailable,
    NoReferenceError, NoReferencedColumnError, NoReferencedTableError,
    NoSuchColumnError, NoSuchModuleError, NoSuchTableError,
    ObjectNotExecutableError, OperationalError, ProgrammingError,
    ResourceClosedError, StatementError, TimeoutError, UnboundExecutionError,
    UnreflectableTableError, UnsupportedCompilationError)

from sqlalchemy.orm.exc import (                                        # noqa
    ConcurrentModificationError, DetachedInstanceError, FlushError,
    LoaderStrategyException, MultipleResultsFound, NoResultFound,
    ObjectDeletedError, ObjectDereferencedError, StaleDataError,
    UnmappedClassError, UnmappedColumnError, UnmappedError,
    UnmappedInstanceError)

from webassets.exceptions import (                                      # noqa
    BuildError, BundleError, EnvironmentError, FilterError)

from werkzeug.exceptions import (                                       # noqa
    BadGateway, BadRequest, Conflict, ExpectationFailed, FailedDependency,
    Forbidden, GatewayTimeout, Gone, HTTPException, HTTPVersionNotSupported,
    ImATeapot, InternalServerError, LengthRequired, Locked, MethodNotAllowed,
    NotAcceptable, NotFound, NotImplemented, PreconditionFailed,
    PreconditionRequired, RequestEntityTooLarge, RequestHeaderFieldsTooLarge,
    RequestTimeout, RequestedRangeNotSatisfiable, ServiceUnavailable,
    TooManyRequests, Unauthorized, UnavailableForLegalReasons,
    UnprocessableEntity, UnsupportedMediaType)

from . import request
from .util import X, echo


handlers = X()
debugging = False


class handle:
    '''
    A wrapper to help us assign an error handler for requests to ``path``.

    We can use :class:`handle` as a decorator, after
    :meth:`~flask.Blueprint.errorhandler`::

        from junior import handle, web

        @handle('/')
        @web.errorhandler(Exception)
        def error(exception):
            ...

    :param path: the path we'll attach to our error handler.
    '''

    def __init__(self, path):
        self.path = path

    def __call__(self, handler):
        handlers[self.path] = handler
        return handler


def debug():
    '''Capture the current ``Exception`` debug information.'''

    debug = X()
    ex = exc_info()

    if any(ex):

        debug.update(X(
            name=sub(r'([A-Z])', r' \1', ex[1].__class__.__name__).strip(),
            message=' '.join(str(ex[1]).split()).replace('"', "'"),
            traceback=[tb.strip().replace('"', "'").split(
                '\n') for tb in format_tb(ex[2])]
        ))

        for i, tb in enumerate(debug.traceback):
            debug.traceback[i] = [line.strip() for line in tb]

    return debug


def error(exception):
    '''
    Collect the data we'll use to construct a :class:`~flask.Response`
    after an ``exception`` was raised.

    :param exception: the ``Exception`` that triggered a
                      :class:`~flask.Response`.
    '''

    error = X()

    if isinstance(exception, type):
        try:
            exception = exception()
        except Exception:
            pass

    if not isinstance(exception, HTTPException):
        exception = InternalServerError()

    error.status = exception.code
    error.name = sub(r'([A-Z])', r' \1', exception.__class__.__name__).strip()
    error.message = '. '.join(exception.args)

    _debug = debug()
    if debugging and any(_debug):
        error.update(_debug)

    if 'message' in error:
        error.message = error.message.replace(
            str(error.status), '').replace(
            error.name, '').replace(':', '').strip()

    if not error.message:
        error.pop('message')
        _debug.pop('message')

    if error.status == 500:
        echo('', '', _debug, '')

    return error


def start(app):
    '''
    Start our global error handler bound to ``app``.
    :meth:`start` wants to be called by :meth:`~junior.Application.start`.

    :param app: an :class:`~junior.Application` for us to attach.
    '''

    from . import errors

    errors.debugging = app.debug

    return app
