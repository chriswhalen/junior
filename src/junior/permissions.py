from flask_security import current_user

from .errors import MultipleResultsFound, NoResultFound
from .models import User


def access():

    permit(User,
           get=deny_all
           )

    permit(User,
           get=allow_self_for_current_user,
           put=allow_self_for_current_user,
           patch=allow_self_for_current_user
           )


def deny_all(model):

    return None


def allow_all(model):

    return all


def allow_self_for_current_user(model):

    try:
        return User.query.filter_by(id=current_user.id)

    except (AttributeError, MultipleResultsFound, NoResultFound):
        return None


def permit(model, **params):

    for p in params:

        q = params[p](model)
        action = params[p].__name__.split('_')[0]

        if action == 'allow':

            if (model.resource.Meta.allowed[p] is all) or (q is all):
                model.resource.Meta.allowed[p] = all

            elif model.resource.Meta.allowed[p] is None:
                model.resource.Meta.allowed[p] = q

            elif q is not None:
                model.resource.Meta.allowed[p] = \
                    model.resource.Meta.allowed[p].union(q)

        if action == 'deny':

            if (model.resource.Meta.allowed[p] is None) or (q is None):
                model.resource.Meta.allowed[p] = None

            elif model.resource.Meta.allowed[p] is all:
                model.resource.Meta.allowed[p] = q

            elif q is not all:
                model.resource.Meta.allowed[p] = \
                    model.resource.Meta.allowed[p].intersect(q)
