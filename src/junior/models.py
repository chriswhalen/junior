from .api import register, resource
from .auth import hash_password
from .controls import allow_self_for_current_user, deny_all
from .db import WithTimestamps, db, filter, model, synonym
from .util import _


@register
@resource
@model
@filter('set', 'password', hash_password)
class User(db.Model, WithTimestamps):

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
