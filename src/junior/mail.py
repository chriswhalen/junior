from flask import current_app


def mail(*messages):

    with current_app.app_context():

        return current_app.mail.get_connection().send_messages(messages)
