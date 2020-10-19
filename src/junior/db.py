from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import event
from sqlalchemy.orm import synonym, validates

from . import dt
from .errors import InvalidRequestError


def model(this):

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
    this.fill = fill
    this.save = save

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


db = SQLAlchemy()


class WithTimestamps:

    created_at = db.Column(db.DateTime, default=dt.now)
    updated_at = db.Column(db.DateTime, default=dt.now, onupdate=dt.now)
