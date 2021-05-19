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


me = None


def encode_key(key):

    # see github.com/pyca/bcrypt#maximum-password-length
    return b_encode(blake2b(b(key), digest_size=48).digest())


def hash_key(key, preserve=True):

    if preserve and len(key) == 60 and key[:4] == '$2b$':
        return key

    return make_hash(encode_key(key), make_salt(env.auth_factor)).decode()


def authorize():

    from junior import auth

    auth.me = User.authenticate(request.headers.get('Authorization'))


@register
@resource
@model
@timestamps
@filter('set', 'key', hash_key)
class User(db.Model):

    class Meta:

        control = X(
            view=(deny_all, allow_self_for_me),
            update=allow_self_for_me,
        )

        exclude = ('key', 'token')

    id = db.Column(db.BigInteger, primary_key=True)

    name = db.Column(db.Text, unique=True, nullable=False)

    key = db.Column(db.Text)
    token = db.Column(db.Text)

    is_active = db.Column(db.Boolean, default=True, nullable=False)

    def authenticate(self, key=None):

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
                    pass

    def get_token(self):

        id = b(0)

        if self.id is not None:
            id = b(self.id)

        token = make_hash(b(self.token), make_salt(env.auth_factor))

        return b_encode(id + token).decode()

    def reset_token(self):

        self.token = b_encode(blake2b(b(dt.now()),
                                      digest_size=48).digest()).decode()

        return self.token


@register
class TokenResource(Resource):

    class Meta:

        endpoint = 'token'

    def get(self, **params):

        return []

    def post(self, **params):

        data = X(request.get_json(force=True))

        for field in ('name', 'key'):
            if field not in data:

                raise BadRequest(f'Missing "{field}"')

        user = User.authenticate(data.name, data.key)

        if user:

            return X(id=user.id, name=user.name, token=user.get_token())

        raise Unauthorized

    def delete(self, **params):

        from junior.auth import me

        try:
            me.reset_token()
            return {}

        except Exception:

            raise Unauthorized
