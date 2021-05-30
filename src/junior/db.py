from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import event
from sqlalchemy.orm import synonym, validates                           # noqa

from . import dt
from .errors import InvalidRequestError
from .util import X


def model(this):
    '''
    Extend a new :class:`~flask_sqlalchemy.Model` ``this``
    with additional framework methods and properties.

    We can use :meth:`model` as a decorator on our new
    :class:`~flask_sqlalchemy.Model` classes::

        from junior import Model, model

        @model
        class User(Model):
            ...

    :param this: a :class:`~flask_sqlalchemy.Model` to extend.

    .. admonition:: Adds

       .. module:: this

       .. property:: this.Meta

          Stores meta information about ``this``.

       .. property:: this.Meta.control

          Describes the access controls for viewing, adding, updating,
          and deleting ``this`` records.

       .. method:: delete

          Delete ``this`` from the database.

       .. method:: fetch

          Fill ``this`` with values fetched from the database,
          using ``this.id`` as a key.

       .. method:: fill(**params)

          Fill ``this`` with ``params``.

       .. method:: save

          Commit ``this`` to the database.
    '''

    class Meta:

        control = X(view=all, add=None, update=None, delete=None)

    @event.listens_for(this, 'init')
    @event.listens_for(this, 'load')
    def load(self, *args, **params):

        self.session = db.create_scoped_session(options={'bind': None})

        try:
            db.session.expunge(self)

        except InvalidRequestError:
            pass

        self.session.add(self)

    def delete(self):

        self.session.delete(self)
        self.session.commit()

        return self

    def fetch(self):

        if not self.id:
            return self

        return self.query.get(self.id)

    def fill(self, **params):

        for param in params:
            setattr(self, param, params[param])

        return self

    def save(self):

        if not self.id:
            self.session.add(self)

        self.session.commit()

        return self

    this.delete = delete
    this.fetch = fetch
    this.fill = fill
    this.save = save

    try:
        this.Meta

    except AttributeError:
        this.Meta = Meta

    try:
        this.Meta.control

    except AttributeError:
        this.Meta.control = Meta.control

    for action in ('view', 'add', 'update', 'delete'):

        if action not in this.Meta.control:
            this.Meta.control[action] = Meta.control[action]

    return this


def on(_event, attribute, function):
    '''
    Trigger a ``function`` on an ``_event`` that targets ``attribute``.

    :param _event: the :func:`sqlalchemy.event` we want to bind.
    :param attribute: the attribute we want to watch.
    :param function: the callback function we want to trigger.
    '''

    def wrapper(this):

        @event.listens_for(getattr(this, attribute), event)
        def listen(target, value, source):

            try:
                return function(value, target, source)

            except TypeError:

                try:
                    return function(value, target)

                except TypeError:

                    try:
                        return function(value)

                    except TypeError:
                        return function()

        return this

    return wrapper


def filter(_event, attribute, function):
    '''
    Apply a filter ``function`` to our results in response to an
    ``_event`` that targets ``attribute``.

    :param _event: the :func:`sqlalchemy.event` we want to bind.
    :param attribute: the attribute we want to watch.
    :param function: the callback function we want to trigger.
    '''

    def wrapper(this):

        @event.listens_for(getattr(this, attribute),
                           _event, retval=True)
        def listen(target, value, oldvalue, source):

            try:
                return function(value, oldvalue, target, source)

            except TypeError:

                try:
                    return function(value, oldvalue, target)

                except TypeError:

                    try:
                        return function(value, oldvalue)

                    except TypeError:

                        try:
                            return function(value)

                        except TypeError:
                            return function()

        return this

    return wrapper


def timestamps(model):
    '''
    Add auto-managed :attr:`created_at` and :attr:`updated_at`
    fields to a ``model``.

    We can use :meth:`timestamps` as a decorator on our new
    :class:`~flask_sqlalchemy.Model` classes, before :meth:`model`::

        from junior import Model, model, timestamps

        @model
        @timestamps
        class User(Model):
            ...

    :param model: the :func:`sqlalchemy.event` we want to monitor.
    '''

    model.created_at = db.Column(db.DateTime, default=dt.now)
    model.updated_at = db.Column(db.DateTime, default=dt.now, onupdate=dt.now)

    return model


#: A :class:`~flask_sqlalchemy.SQLAlchemy`
#: to manage our application's primary database connection.
#: Its connection details are populated from our application's configuration.
db = SQLAlchemy()


#: The ``alembic_version`` :class:`~sqlalchemy.schema.Table`
#: to store our migrations.
AlembicVersion = db.Table('alembic_version',
                          db.metadata,
                          db.Column('version_num',
                                    db.String(32),
                                    nullable=False))
