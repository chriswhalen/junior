from .api import register, resource
from .auth import hash_password
from .controls import allow_self_for_current_user, deny_all
from .db import WithTimestamps, db, filter, model
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

        exclude = ('fs_uniquifier', 'password', 'tf_totp_secret',
                   'us_phone_number', 'us_totp_secrets', 'login_count')

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.Text, unique=True, nullable=False)

    password = db.Column(db.Text, nullable=False)

    fs_uniquifier = db.Column(db.Text, unique=True, nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    confirmed_at = db.Column(db.DateTime)

    last_login_at = db.Column(db.DateTime)
    current_login_at = db.Column(db.DateTime)
    last_login_ip = db.Column(db.Text)
    current_login_ip = db.Column(db.Text)
    login_count = db.Column(db.Integer)

    tf_primary_method = db.Column(db.Text)
    tf_totp_secret = db.Column(db.Text)
    tf_phone_number = db.Column(db.Text)
    us_totp_secrets = db.Column(db.Text)
    us_phone_number = db.Column(db.Text)
