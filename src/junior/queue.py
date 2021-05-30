from celery import Celery

from .config import celery as celery_config

#: A :class:`~celery.Celery` to process our queued tasks.
queue = Celery('app')
queue.conf.update(celery_config)


def start(app):
    '''
    Start :attr:`queue` bound to ``app``.
    :meth:`start` wants to be called by :meth:`~junior.Application.start`.

    :param app: an :class:`~junior.Application` for us to attach.
    '''

    class Task(queue.Task):

        def __call__(self, *args, **params):

            with app.app_context():
                return self.run(*args, **params)

    queue.Task = Task

    return app
