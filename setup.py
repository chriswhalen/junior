#!/usr/bin/env python


from setuptools import setup


with open('README.md', 'r') as file:
    readme = file.read()


setup(
    name='junior',
    version='0.5.0',
    url='https://itsjunior.com',
    license='MIT',
    author='Chris Whalen',
    author_email='chris@chriswhalen.ca',
    description='A full stack web framework, powered by Flask.',
    long_description=readme,
    long_description_content_type='text/markdown',
    packages=['junior'],
    package_data={'junior': ['config/*',
                             'migrations/*',
                             'scripts/*',
                             'templates/*']},
    package_dir={'': 'src'},
    platforms='any',
    entry_points={
        'flask.commands': [
            'run=junior.cli:run',
            'shell=junior.cli:shell'
        ]
    },
    install_requires=[
        'alembic~=1.6',
        'amqp~=5.0',
        'apiflask~=0.6',
        'autopep8~=1.5',
        'bcrypt~=3.2',
        'bidict~=0.21',
        'billiard~=3.6',
        'celery~=5.0',
        'cffi~=1.14',
        'click~=7.1',
        'flask~=2.0',
        'flask-alembic~=2.0',
        'flask-assets~=2.0',
        'flask-babel~=2.0',
        'flask-caching~=1.10',
        'flask-marshmallow~=0.14',
        'flask-socketio~=5.0',
        'flask-sqlalchemy~=2.5',
        'gunicorn~=20.1',
        'hamlish-jinja~=0.3',
        'itsdangerous~=1.1',
        'jinja2~=2.11',
        'konch~=4.3',
        'mako~=1.1',
        'marshmallow~=3.11',
        'marshmallow-sqlalchemy~=0.24',
        'munch~=2.5',
        'mysqlclient~=2.0',
        'psycopg2~=2.8',
        'python-dateutil~=2.8',
        'python-editor~=1.0',
        'python-engineio~=4.1',
        'pyyaml~=5.4',
        'readline~=6.2',
        'sqlalchemy~=1.4',
        'sqlalchemy-migrate~=0.13',
        'toml~=0.10',
        'webassets~=2.0'
    ],
    classifiers=[
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Topic :: Software Development :: Libraries :: Python Modules'
    ],
)
