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


#: A :class:`~flask.Blueprint` governing the RESTful API.
api = Blueprint('api', __name__)

#: An :class:`~flask_restful.Api` bound to :attr:`api`.
#: It allows us to attach :class:`~flask_restful.Resource` objects to
#: :attr:`api`, assigning them each a URL based on their class name by default.
rest = Api(api)

#: A :class:`~flask_marshmallow.Marshmallow` to help us
#: serialize database records into a plain text JSON response.
schemas = Marshmallow()

#: The :class:`~flask_restful.Resource` objects we've attached to :attr:`api`.
resources = []

#: The API's properties. These values can be managed under the ``api`` section
#: of ``config/app.yaml``. :attr:`properties.root` defaults to ``'/api/v1/'``;
#: :attr:`properties.version` defaults to ``1``;
#: :attr:`properties.updated_at` defaults to the date and time
#: we ``import``-ed junior.
properties = X(
    endpoints={},
    root=f'/api/v{config.api.version}/',
    version=config.api.version,
    updated_at=config.api.updated_at
)

api.url_prefix = properties.root[:-1]


def resource(this):
    '''
    Create a new :class:`~flask_restful.Resource` from a
    :class:`~flask_sqlalchemy.Model` ``this``.
    We can use :attr:`resource` as a decorator on our new
    :class:`~flask_sqlalchemy.Model` classes, after :attr:`~junior.db.model`::

        from junior import Model, model, register, resource

        @register
        @resource
        @model
        class User(Model):
            ...

    :attr:`resource` provides two classes:

        *   :class:`ModelSchema` is a
            :class:`~marshmallow_sqlalchemy.SQLAlchemyAutoSchema`
            bound to a :class:`~flask_sqlalchemy.Model`.
            It helps us serialize a :class:`~flask_sqlalchemy.Model`
            instance or collection into a JSON response.

        *   :class:`ModelResource` is a
            :class:`~flask_restful.Resource`
            bound to a :class:`~flask_sqlalchemy.Model`.
            It provides us a set of RESTful routes that perform
            :class:`~flask_sqlalchemy.Model` actions.
            The model's :attr:`Meta` attribute controls the routes' behaviour.

    :param this: the :class:`~flask_sqlalchemy.Model` we'll use to build a new
                 :class:`~flask_restful.Resource`.
    '''

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

            # apply each control in order
            for control in controls:

                controlled_query = None

                try:
                    controlled_query = control(self.Meta.model)

                except Exception:
                    pass

                permission = control.__name__.split('_')[0]

                # "allow" controls union a query to the previous one
                if permission == 'allow':

                    if (query is all) or (controlled_query is all):
                        query = all

                    elif query is None:
                        query = controlled_query

                    elif controlled_query is not None:
                        query = query.union(controlled_query)

                # "deny" controls except a query from the previous one
                if permission == 'deny':

                    if (query is None) or (controlled_query is all):
                        query = None

                    elif query is all:
                        query = self.Meta.model.query
                        query.except_(controlled_query)

                    elif controlled_query is not all:
                        query = query.except_(controlled_query)

            # for the "add" action, we want to check for permission to create
            # records on this model and return "all" or "None" accordingly.
            # otherwise, we translate "all" into an unfiltered query
            # and "None" into a query with limit 0.
            if action != 'add':

                if query is all:
                    return self.Meta.model.query

                if query is None:
                    return self.Meta.model.query.limit(0).from_self()

            return query

        def get(self, **params):
            '''Fetch all records, or one record by ``id`` parameter.'''

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
            '''Create a new record with attributes filled from ``params``.'''

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
            '''
            Update an existing record by ``id`` parameter
            with attributes filled from ``params``.
            '''

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
            '''Delete an existing record by ``id`` parameter.'''

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

    # Assign our ModelResource and ModelSchema
    # a unique class name based on our Model name
    ModelResource.__name__ = f'{this.__name__}Resource'
    ModelSchema.__name__ = f'{this.__name__}Schema'

    # Alias PUT to PATCH
    ModelResource.patch = ModelResource.put

    # A serializer for a single record
    this.one = ModelSchema(many=False)

    # A serializer for a set of records
    this.many = ModelSchema(many=True)

    this.resource = ModelResource
    this.schema = ModelSchema

    return this


def register(this, name=None, endpoint=None, *params):
    '''
    Attach a :class:`~flask_restful.Resource` ``this`` to :attr:`api`.
    We can use :attr:`register` as a decorator on our new
    :class:`~flask_sqlalchemy.Model` classes, after :attr:`register`::

        from junior import Model, model, register, resource

        @register
        @resource
        @model
        class User(Model):
            ...

    :param this: the :class:`~flask_sqlalchemy.Resource` we'll attach to
                 :attr:`api`.
    :param name: the name of our :class:`~flask_sqlalchemy.Resource`;
                 defaults to the underlying :class:`~flask_sqlalchemy.Model`'s
                 pluralized name.
    :param endpoint: the root URL path we'll assign to our
                     :class:`~flask_sqlalchemy.Resource`; defaults to ``name``
                     transformed to `snake_case`.
    '''

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

    paths = [f'/{endpoint}']
    properties.endpoints[name] = f'{properties.root}{endpoint}/'

    if len(params) == 0:

        try:
            params = ([key.name for key in
                      resource.Meta.model.__table__.primary_key])

        except AttributeError:
            pass

    for param in params:
        paths.append(f'{paths[-1]}/<string:{param}>')

    if len(paths) > 1:
        paths[0] = f'{paths[0]}/'

    else:
        properties.endpoints[name] = properties.endpoints[name][:-1]

    rest.add_resource(resource, *paths)
    resources.append(resource)

    return this


def defaults():
    '''
    Add a default set of routes to :attr:`api`:

        * ``/`` returns :attr:`properties`;
        * a missing path raises :class:`~werkzeug.exceptions.NotFound`;
        * a raised ``Exception`` calls :meth:`~flask.Flask.errorhandler`
          to return a JSON response with an appropriate error message
          and HTTP status code.
    '''

    @api.route('/')
    def __index():

        return properties

    @api.route('/<path:path>')
    def __default(**params):

        raise NotFound

    @handle(api.url_prefix + '/')
    @api.errorhandler(Exception)
    def __error(exception):

        message = error(exception)
        return {'error': message}, message.status


def start(app):
    '''
    Start :attr:`api` and register it to ``app``.
    :meth:`start` wants to be called by :meth:`~junior.Application.start`.

    :param app: an :class:`~junior.Application` for us to register :attr:`api`.
    '''

    from . import _api

    _api.defaults()

    app.register_blueprint(_api.api, url_prefix=_api.api.url_prefix)

    return app
