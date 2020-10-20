from flask_security import (SQLAlchemyUserDatastore as UserDatastore,
                            UserMixin as WithUser, current_user, hash_password)

from . import request, response
from .api import Resource, register, resource
from .controls import allow_self_for_current_user, deny_all
from .db import WithTimestamps, db, filter, model, synonym
from .errors import BadRequest, Unauthorized, error
from .util import _


class Users(UserDatastore):

    def put(self, model):
        model.save()
        return model

    def delete(self, model):
        model.delete()


@register
@resource
@model
@filter('set', 'password', hash_password)
class User(db.Model, WithUser, WithTimestamps):

    class Meta:

        control = _(
            query=(deny_all, allow_self_for_current_user),
            update=allow_self_for_current_user,
        )

        exclude = ('token', 'password')

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.Text, unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)

    active = db.Column(db.Boolean, default=True, nullable=False)

    token = db.Column(db.Text, unique=True)
    fs_uniquifier = synonym('token')


@register
class TokenResource(Resource):

    class Meta:

        endpoint = 'token'

    def get(self, **params):

        return []

    def post(self, **params):

        data = _(request.get_json(force=True))

        try:
            user = User.query.filter(User.name == data.name).first()

        except AttributeError:
            e = error(BadRequest, 'Missing field: name')
            return {'error': e}, e.code

        if user is None:
            raise Unauthorized

        try:
            if user.verify_and_update_password(data.password):
                return {'id': user.get_auth_token()}

            raise Unauthorized

        except AttributeError:
            e = error(BadRequest, 'Missing field: password')
            return {'error': e}, e.code

    def delete(self, **params):

        current_user.set_uniquifier()
        return response('')
