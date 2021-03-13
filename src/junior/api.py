from re import sub

from flask.json import JSONEncoder

from flask_marshmallow import Marshmallow

from flask_restful import Api as RestfulApi, Resource

from . import Blueprint, X, dt
from .config import config
from .errors import (BadRequest, DataError, MultipleResultsFound,
                     NoResultFound, NotFound, error, handle)


class Encoder(JSONEncoder):

    def default(self, o):

        if isinstance(o, dt):
            return o.isoformat()

        return super().default(o)


class Api(RestfulApi):

    def _should_use_fr_error_handler(self):
        pass

    def error_router(self, handler, e):
        return handler(e)


api = Blueprint('api', __name__)
rest = Api(api)
schemas = Marshmallow()
resources = []

properties = X(
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

            try:
                endpoint = this.Meta.endpoint

            except AttributeError:
                pass

        def query(self, action='view'):

            query = self.Meta.model.query
            controls = self.Meta.model.Meta.control[action]

            try:
                controls[0]

            except TypeError:
                controls = (controls,)

            for control in controls:

                controlled_query = None

                try:
                    controlled_query = control(self.Meta.model)

                except Exception:
                    pass

                permission = control.__name__.split('_')[0]

                if permission == 'allow':

                    if (query is all) or (controlled_query is all):
                        query = all

                    elif query is None:
                        query = controlled_query

                    elif controlled_query is not None:
                        query = query.union(controlled_query)

                if permission == 'deny':

                    if (query is None) or (controlled_query is None):
                        query = None

                    elif query is all:
                        query = controlled_query

                    elif controlled_query is not all:
                        query = query.intersect(controlled_query)

            if action != 'add':

                if query is all:
                    return self.Meta.model.query

                if query is None:
                    return self.Meta.model.query.limit(0).from_self()

            return query

        def get(self, **params):

            try:
                query = self.query()

                if 'id' in params:
                    return self.Meta.model.one.jsonify(
                        query.filter_by(**params).one())

                return self.Meta.model.many.jsonify(query.all())

            except NoResultFound:
                raise NotFound

            except (DataError, MultipleResultsFound):
                raise BadRequest

        def post(self, **params):

            if self.query('add'):

                try:
                    record = self.Meta.model()
                    record.fill(**params)
                    record.save()
                    return self.Meta.model.one.jsonify(record)

                except DataError:
                    raise BadRequest

            return {}

        def put(self, **params):

            try:
                if 'id' in params:

                    record = self.Meta.model.query.get(params['id'])

                    if (record in self.query('update')):

                        record.fill(**params)
                        record.save()
                        return self.Meta.model.one.jsonify(record)

                else:
                    raise BadRequest

            except DataError:
                raise BadRequest

            return {}

        def patch(self, **params):

            try:
                if 'id' in params:

                    record = self.Meta.model.query.get(params['id'])

                    if (record in self.query('update')):

                        record.fill(**params)
                        record.save()
                        return self.Meta.model.one.jsonify(record)

                else:
                    raise BadRequest

            except DataError:
                raise BadRequest

            return {}

        def delete(self, **params):

            try:
                if 'id' in params:

                    record = self.Meta.model.get(params['id'])

                    if (record in self.query('delete')):

                        record.delete()
                        return self.Meta.model.one.jsonify(record)

                else:
                    raise BadRequest

            except DataError:
                raise BadRequest

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
        return {'error': message}, message.status


def start(app):

    from . import _api

    _api.defaults()

    app.register_blueprint(_api.api, url_prefix=_api.api.url_prefix)

    return app
