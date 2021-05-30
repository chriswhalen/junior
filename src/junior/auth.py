from base64 import b64decode as b_decode, b64encode as b_encode
from hashlib import blake2b

from bcrypt import (checkpw as check_hash, gensalt as make_salt,
                    hashpw as make_hash)

from . import dt, request
from .api import Resource, register, resource
from .config import env
from .controls import allow_self_for_me, deny_all
from .db import db, filter, model, timestamps
from .errors import BadRequest, Unauthorized
from .util import X, b


#: The currently authenticated :class:`User`.
#: :attr:`me` is only valid within a single :class:`~flask.Request`.
me = None


def encode_key(key):

    # see github.com/pyca/bcrypt#maximum-password-length
    return b_encode(blake2b(b(key), digest_size=48).digest())


def hash_key(key, preserve=True):

    if preserve and len(key) == 60 and key[:4] == '$2b$':
        return key

    return make_hash(encode_key(key), make_salt(env.auth_factor)).decode()


def authenticate():
    '''
    Authenticate a :class:`User` for this request.
    :func:`authenticate` uses the incoming ``Authorization``
    HTTP header to assign :attr:`me` a :class:`User`
    for the remainder of our :class:`~flask.Request` lifecycle.
    :func:`authenticate` wants to be called by
    :meth:`~flask.Flask.before_request`.
    '''

    from junior import auth

    auth.me = User.authenticate(request.headers.get('Authorization'))


@register
@resource
@model
@timestamps
@filter('set', 'key', hash_key)
class User(db.Model):
    '''A :class:`~flask_sqlalchemy.Model` to help authenticate our users.'''

    class Meta:

        control = X(
            view=(deny_all, allow_self_for_me),
            update=allow_self_for_me,
        )

        exclude = ('key', 'token')

    #: The user's primary key.
    id = db.Column(db.BigInteger, primary_key=True)

    #: The user's name.
    name = db.Column(db.Text, unique=True, nullable=False)

    #: The user's password.
    key = db.Column(db.Text)

    #: The user's persistent token value.
    token = db.Column(db.Text)

    #: Can the user authenticate?
    is_active = db.Column(db.Boolean, default=True, nullable=False)

    def authenticate(self, key=None):
        '''
        Authenticate a :class:`User` from a ``key``.

        We can call :meth:`authenticate` as either a static class method,
        or a local instance method, as our situation demands.

        Called on a :class:`User` instance, :meth:`authenticate`
        accepts a plaintext ``key`` and compares it to our stored,
        hashed :attr:`key`, returning ``True`` if they match
        or ``False`` if they don't.

        Called directly on the :class:`User` class, :meth:`authenticate`
        accepts ``key`` as its first parameter and parses it as
        :attr:`id` and :attr:`token`, returning the selected
        :class:`User` if they match or ``None`` if they don't.

        :param key: a :attr:`key` or :attr:`id`/:attr:`token` pair matching the
                    :class:`User` we want to authenticate.
        '''

        try:
            self = b_decode(self)
            user = User.query.get(int(self[:8].hex(), base=16))

            if user.is_active and check_hash(b(user.token), self[8:]):

                return user

        except Exception:

            User.query.session.rollback()

            try:
                user = User.query.filter_by(name=self).first()

                if user.is_active and check_hash(encode_key(key), b(user.key)):

                    user.key = key
                    user.save()
                    return user

                User.query.session.rollback()
                user = User.query.filter_by(id=self).first()

                if user.is_active and check_hash(encode_key(key), b(user.key)):

                    user.key = key
                    user.save()
                    return user

            except Exception:

                User.query.session.rollback()

                try:
                    if self.is_active:

                        if check_hash(b(self.token), b_decode(key)[8:]):

                            return True

                        if check_hash(encode_key(key), b(self.key)):

                            user.key = key
                            user.save()
                            return True

                    return False

                except Exception:

                    return False

    def get_token(self):
        '''Generate a new authentication token for this :class:`User`.'''

        id = b(0)

        if self.id is not None:
            id = b(self.id)

        token = make_hash(b(self.token), make_salt(env.auth_factor))

        return b_encode(id + token).decode()

    def reset_token(self):
        '''Clear all existing authentication tokens for this :class:`User`.'''

        self.token = b_encode(blake2b(b(dt.now()),
                                      digest_size=48).digest()).decode()

        return self.token


@register
class TokenResource(Resource):
    '''
    A :class:`~flask_restful.Resource` governing :class:`User` authentication.
    '''

    class Meta:
        ''':class:`TokenResource` ``Meta``.'''

        #: The endpoint for :class:`TokenResource`.
        endpoint = 'token'

    def get(self, **params):
        '''Unused; returns ``[]``.'''

        return []

    def post(self, **params):
        '''
        Authenticate a :class:`User` by ``name`` and ``key``,
        returning a ``token`` on success or raising
        :class:`~werkzeug.exceptions.Unauthorized` on failure.
        '''

        data = X(request.get_json(force=True))

        for field in ('name', 'key'):
            if field not in data:

                raise BadRequest(f'Missing "{field}"')

        user = User.authenticate(data.name, data.key)

        if user:

            return X(id=user.id, name=user.name, token=user.get_token())

        raise Unauthorized

    def delete(self, **params):
        '''Clear all existing tokens for an authenticated :class:`User`.'''

        from junior.auth import me

        try:
            me.reset_token()
            return {}

        except Exception:

            raise Unauthorized
