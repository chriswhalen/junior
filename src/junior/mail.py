from flask import current_app


def mail(*messages):
    '''
    Send a collection of email :class:`~junior.Message` ``messages``
    all at once.

    :param messages: the collection of :class:`~junior.Message`
                     objects we want to send.
    '''

    with current_app.app_context():

        return current_app.mail.get_connection().send_messages(messages)
