from re import sub
from sys import exc_info
from traceback import format_tb

from jinja2.exceptions import (
    FilterArgumentError, SecurityError, TemplateAssertionError, TemplateError,
    TemplateNotFound, TemplateRuntimeError, TemplateSyntaxError,
    TemplatesNotFound, UndefinedError)

from sqlalchemy.exc import (
    AmbiguousForeignKeysError, ArgumentError, CircularDependencyError,
    CompileError, DBAPIError, DataError, DatabaseError, DisconnectionError,
    IdentifierError, IntegrityError, InterfaceError, InternalError,
    InvalidRequestError, NoForeignKeysError, NoInspectionAvailable,
    NoReferenceError, NoReferencedColumnError, NoReferencedTableError,
    NoSuchColumnError, NoSuchModuleError, NoSuchTableError,
    ObjectNotExecutableError, OperationalError, ProgrammingError,
    ResourceClosedError, StatementError, TimeoutError, UnboundExecutionError,
    UnreflectableTableError, UnsupportedCompilationError)

from sqlalchemy.orm.exc import (
    ConcurrentModificationError, DetachedInstanceError, FlushError,
    LoaderStrategyException, MultipleResultsFound, NoResultFound,
    ObjectDeletedError, ObjectDereferencedError, StaleDataError,
    UnmappedClassError, UnmappedColumnError, UnmappedError,
    UnmappedInstanceError)

from webassets.exceptions import (
    BuildError, BundleError, EnvironmentError, FilterError)

from werkzeug.exceptions import (
    BadGateway, BadRequest, Conflict, ExpectationFailed, FailedDependency,
    Forbidden, GatewayTimeout, Gone, HTTPException, HTTPVersionNotSupported,
    ImATeapot, InternalServerError, LengthRequired, Locked, MethodNotAllowed,
    NotAcceptable, NotFound, NotImplemented, PreconditionFailed,
    PreconditionRequired, RequestEntityTooLarge, RequestHeaderFieldsTooLarge,
    RequestTimeout, RequestedRangeNotSatisfiable, ServiceUnavailable,
    TooManyRequests, Unauthorized, UnavailableForLegalReasons,
    UnprocessableEntity, UnsupportedMediaType)

from . import request
from .util import _


handlers = _()
debugging = False


class handle:

    def __init__(self, path):
        self.path = path

    def __call__(self, handler):
        handlers[self.path] = handler
        return handler


def debug():

    debug = _()
    ex = exc_info()

    if any(ex):

        debug.update(_(
            name=sub(r'([A-Z])', r' \1', ex[1].__class__.__name__).strip(),
            message=' '.join(str(ex[1]).split()).replace('"', "'"),
            traceback=[tb.strip().replace('"', "'").split(
                '\n') for tb in format_tb(ex[2])]
        ))

        for i, tb in enumerate(debug.traceback):
            debug.traceback[i] = [line.strip() for line in tb]

    return debug


def error(exception, message=None):

    error = _()

    if isinstance(exception, type):
        try:
            exception = exception()
        except Exception:
            pass

    if not isinstance(exception, HTTPException):
        exception = InternalServerError()

    error.code = exception.code
    error.name = sub(r'([A-Z])', r' \1', exception.__class__.__name__).strip()

    _debug = debug()
    if debugging and any(_debug):
        error.update(_debug)

    if message:
        error.message = message

    return error


def err(exception):

    for path in sorted(handlers.keys(), key=len)[::-1]:
        if request.path.startswith(path):
            return handlers[path](exception)


def start(app):

    from . import errors

    errors.debugging = app.debug

    return app
