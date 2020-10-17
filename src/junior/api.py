from re import sub

from flask_marshmallow import Marshmallow

from flask_restful import Api as RestfulApi, Resource

from . import Blueprint, _
from .config import config
from .controls import permit
from .errors import (
    DataError, MultipleResultsFound, NoResultFound, NotFound, error, handle)


class Api(RestfulApi):

    def _should_use_fr_error_handler(self):
        pass

    def error_router(self, handler, e):
        return handler(e)


api = Blueprint('api', __name__)
rest = Api(api)
schemas = Marshmallow()
resources = []

properties = _(
    endpoints={},
    root='/api/v%i/' % (config.api.version,),
    version=config.api.version,
    updated_at=config.api.updated_at
)

api.url_prefix = properties.root[:-1]


def resource(this):

    class ModelSchema(schemas.SQLAlchemyAutoSchema):

        class Meta:

            model = this
            exclude = []
            only = []

            try:
                exclude = this.Meta.exclude

            except AttributeError:
                pass

            try:
                only = this.Meta.only

            except AttributeError:
                pass

    class ModelResource(Resource):

        class Meta:

            model = this
            allow = _(query=all, add=None, update=None, delete=None)

            try:
                endpoint = this.Meta.endpoint

            except AttributeError:
                pass

        def query(self):

            if self.Meta.allow.query is all:
                return self.Meta.model.query

            if self.Meta.allow.query is None:
                return self.Meta.model.query.limit(0).from_self()

            return self.Meta.allow.query.from_self()

        def get(self, **params):

            try:
                query = self.query()

                if 'id' in params:
                    return self.Meta.model.one.jsonify(
                        query.filter_by(**params).one())

                return self.Meta.model.many.jsonify(query.all())

            except NoResultFound:
                return error(404)

            except (DataError, MultipleResultsFound):
                return error(400)

        def post(self, **params):

            if self.Meta.allow.add is all:

                try:
                    record = self.Meta.model()
                    record.fill(**params)
                    record.save()
                    return self.Meta.model.one.jsonify(record)

                except DataError:
                    return error(400)

            return {}

        def put(self, **params):

            if self.Meta.allow.update is None:
                return {}

            try:
                if 'id' in params:

                    record = self.Meta.model.get(params['id'])

                    if (self.Meta.allow.update is all or
                            record in self.Meta.allow.update):

                        record.fill(**params)
                        record.save()
                        return self.Meta.model.one.jsonify(record)

                else:
                    return error(400)

            except DataError:
                return error(400)

            return {}

        def patch(self, **params):

            if self.Meta.allow.update is None:
                return {}

            try:
                if 'id' in params:

                    record = self.Meta.model.get(params['id'])

                    if (self.Meta.allow.update is all or
                            record in self.Meta.allow.update):

                        record.fill(**params)
                        record.save()
                        return self.Meta.model.one.jsonify(record)

                else:
                    return error(400)

            except DataError:
                return error(400)

            return {}

        def delete(self, **params):

            if self.Meta.allow.delete is None:
                return {}

            try:
                if 'id' in params:

                    record = self.Meta.model.get(params['id'])

                    if (self.Meta.allow.delete is all or
                            record in self.Meta.allow.delete):

                        record.delete()
                        return self.Meta.model.one.jsonify(record)

                else:
                    return error(400)

            except DataError:
                return error(400)

            return {}

    ModelResource.__name__ = '%sResource' % (this.__name__,)
    this.resource = ModelResource

    ModelSchema.__name__ = '%sSchema' % (this.__name__,)
    this.one = ModelSchema(many=False)
    this.many = ModelSchema(many=True)
    this.schema = ModelSchema

    return this


def register(this, name=None, endpoint=None, *params):

    try:
        resource = this.resource

    except AttributeError:
        resource = this

    if name is None:

        name = resource.__name__

        if name.endswith('Resource') and name != 'Resource':
            name = name[:-8]

    if endpoint is None:

        try:
            endpoint = resource.Meta.endpoint

        except AttributeError:
            endpoint = '%ss' % (sub(r'([A-Z])', r'_\1', name)[1:].lower(),)

    paths = ['/%s' % (endpoint,)]
    properties.endpoints[name] = '%s%s/' % (properties.root, endpoint)

    if len(params) == 0:

        try:
            params = ([key.name for key in
                      resource.Meta.model.__table__.primary_key])

        except AttributeError:
            pass

    for param in params:
        paths.append('%s/<string:%s>' % (paths[-1], param))

    if len(paths) > 1:
        paths[0] = '%s/' % paths[0]

    else:
        properties.endpoints[name] = properties.endpoints[name][:-1]

    rest.add_resource(resource, *paths)
    resources.append(resource)

    return this


def defaults():

    @api.route('/')
    def __index():

        return properties

    @api.route('/<path:path>')
    def __default(**params):

        raise NotFound

    @handle(api.url_prefix+'/')
    @api.errorhandler(Exception)
    def __error(exception):

        message = error(exception)
        return {'error': message}, message.code


def start(app):

    from . import _api

    _api.defaults()

    with app.app_context():

        for resource in _api.resources:

            try:
                permit(resource.Meta.model, **resource.Meta.model.Meta.control)

            except AttributeError:
                pass

    app.register_blueprint(_api.api,
                           url_prefix=_api.api.url_prefix)

    return app
