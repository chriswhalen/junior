from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import event
from sqlalchemy.orm import synonym, validates                           # noqa

from . import dt
from .errors import InvalidRequestError
from .util import X


def model(this):

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

    model.created_at = db.Column(db.DateTime, default=dt.now)
    model.updated_at = db.Column(db.DateTime, default=dt.now, onupdate=dt.now)

    return model


db = SQLAlchemy()


AlembicVersion = db.Table('alembic_version',
                          db.metadata,
                          db.Column('version_num',
                                    db.String(32),
                                    nullable=False))
