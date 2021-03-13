from .errors import MultipleResultsFound, NoResultFound


def deny_all(model):

    return None


def allow_all(model):

    return all


def allow_self_for_me(model):

    from .auth import me

    try:
        return model.query.filter_by(id=me.id)

    except (AttributeError, MultipleResultsFound, NoResultFound):

        model.query.session.rollback()
        return None


def allow_belongs_to_me(model):

    from .auth import me

    try:
        return model.query.filter_by(user_id=me.id)

    except (AttributeError, MultipleResultsFound, NoResultFound):

        model.query.session.rollback()
        return None
