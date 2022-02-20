from celery import Celery

from .config import celery_options


queue = Celery('app')
queue.conf.update(celery_options)


def start(app):

    class Task(queue.Task):

        def __call__(self, *args, **params):

            with app.app_context():
                return self.run(*args, **params)

    queue.Task = Task

    return app
