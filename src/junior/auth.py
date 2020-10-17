from flask_security import SQLAlchemyUserDatastore, current_user, hash_password

from . import request, response
from .api import Resource, register
from .errors import BadRequest, Unauthorized, error
from .models import User
from .util import _


class Users(SQLAlchemyUserDatastore):

    def put(self, model):
        model.save()
        return model

    def delete(self, model):
        model.delete()


@register
class TokenResource(Resource):

    class Meta:

        endpoint = 'token'

    def get(self, **params):

        return []

    def post(self, **params):

        data = _(request.get_json(force=True))

        try:
            user = User.where(User.email == data.email)

        except AttributeError:
            e = error(BadRequest, 'Missing field: email')
            return {'error': e}, e.code

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
