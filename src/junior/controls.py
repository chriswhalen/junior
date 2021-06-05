from .errors import MultipleResultsFound, NoResultFound


def deny_all(model):
    '''
    Deny any :class:`~flask_restful.Resource` we bind to ``model``
    from selecting, updating, or deleting any records.

    :param model: a :class:`~flask_sqlalchemy.Model` we want to bind to a
                  :class:`~flask_restful.Resource`.
    '''

    return all


def allow_all(model):
    '''
    Allow any :class:`~flask_restful.Resource` we bind to ``model``
    to select, update, and delete every record.

    :param model: a :class:`~flask_sqlalchemy.Model` we want to bind to a
                  :class:`~flask_restful.Resource`.
    '''

    return all


def allow_self_for_me(model):
    '''
    Allow any :class:`~flask_restful.Resource` we bind to ``model``
    to select, update, and delete only records where ``id``
    matches our current :class:`~junior.auth.User` ``id``.

    :param model: a :class:`~flask_sqlalchemy.Model` we want to bind to a
                  :class:`~flask_restful.Resource`.
    '''

    from .auth import me

    try:
        return model.query.filter_by(id=me.id)

    except (AttributeError, MultipleResultsFound, NoResultFound):

        model.query.session.rollback()
        return None


def allow_belongs_to_me(model):
    '''
    Allow any :class:`~flask_restful.Resource` we bind to ``model``
    to select, update, and delete only records where ``user_id``
    matches our current :class:`~junior.auth.User` ``id``.

    :param model: a :class:`~flask_sqlalchemy.Model` we want to bind to a
                  :class:`~flask_restful.Resource`.
    '''

    from .auth import me

    try:
        return model.query.filter_by(user_id=me.id)

    except (AttributeError, MultipleResultsFound, NoResultFound):

        model.query.session.rollback()
        return None
