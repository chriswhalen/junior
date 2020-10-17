from flask_security import current_user

from .errors import MultipleResultsFound, NoResultFound


def deny_all(model):

    return None


def allow_all(model):

    return all


def allow_self_for_current_user(model):

    try:
        return model.query.filter_by(id=current_user.id)

    except (AttributeError, MultipleResultsFound, NoResultFound):
        return None


def allow_belongs_to_current_user(model):

    try:
        return model.query.filter_by(user_id=current_user.id)

    except (AttributeError, MultipleResultsFound, NoResultFound):
        return None


def permit(model, **params):

    for p in params:

        controls = params[p]

        try:
            controls[0]

        except TypeError:
            controls = (controls,)

        for control in controls:

            query = control(model)
            action = control.__name__.split('_')[0]

            if action == 'allow':

                if (model.resource.Meta.allow[p] is all) or (query is all):
                    model.resource.Meta.allow[p] = all

                elif model.resource.Meta.allow[p] is None:
                    model.resource.Meta.allow[p] = query

                elif query is not None:
                    model.resource.Meta.allow[p] = \
                        model.resource.Meta.allow[p].union(query)

            if action == 'deny':

                if (model.resource.Meta.allow[p] is None) or (query is None):
                    model.resource.Meta.allow[p] = None

                elif model.resource.Meta.allow[p] is all:
                    model.resource.Meta.allow[p] = query

                elif query is not all:
                    model.resource.Meta.allow[p] = \
                        model.resource.Meta.allow[p].intersect(query)
