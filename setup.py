#!/usr/bin/env python

from json import loads

from setuptools import setup


package = {}

with open('package.json', 'r') as file:
    package = loads(file.read())

try:
    with open('README.md', 'r') as file:
        package['long_description'] = file.read()

except Exception:
    package['long_description'] = package['description']


setup(
    name=package['name'].split('/')[-1],
    version=package['version'],
    url=package['homepage'],
    license=package['license'],
    author=package['author']['name'],
    author_email=package['author']['email'],
    maintainer=package['author']['name'],
    maintainer_email=package['author']['email'],
    description=package['description'],
    long_description=package['long_description'],
    long_description_content_type='text/markdown',
    project_urls={
        'Issues': 'https://github.com/chriswhalen/junior/issues',
        'Source': 'https://github.com/chriswhalen/junior',
        'Documentation': 'https://itsjunior.readthedocs.io',
    },
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
        'alembic==1.7.6',
        'amqp==5.0.9',
        'autopep8==1.6.0',
        'bcrypt==3.2.0',
        'celery==5.2.3',
        'cffi==1.15.0',
        'click==8.0.4',
        'flask==2.0.3',
        'flask-alembic==2.0.1',
        'flask-assets==2.0',
        'flask-babel==2.0.0',
        'flask-caching==1.10.1',
        'flask-mailman==0.3.0',
        'flask-marshmallow==0.14.0',
        'flask-restful==0.3.9',
        'flask-socketio==5.1.1',
        'flask-sqlalchemy==2.5.1',
        'gunicorn==20.1.0',
        'hamlish-jinja==0.3.3',
        'itsdangerous==2.1.0',
        'jinja2==3.0.3',
        'konch==4.4.0',
        'mako==1.1.6',
        'marshmallow==3.14.1',
        'marshmallow-sqlalchemy==0.27.0',
        'munch==2.5.0',
        'python-dateutil==2.8.2',
        'python-editor==1.0.4',
        'python-engineio==4.3.1',
        'pyyaml==6.0',
        'readline==6.2.4.1',
        'sqlalchemy==1.4.39',
        'sqlalchemy-migrate==0.13.0',
        'toml==0.10.2',
        'webassets==2.0',
        'whitenoise==6.0.0'
    ],
    extras_require={
        'mysql':    ['mysqlclient==2.1.0'],
        'postgres': ['psycopg2==2.9.3'],
    },
    classifiers=[
        'Environment :: Web Environment',
        'Framework :: Flask',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Topic :: Software Development :: Libraries :: Python Modules'
    ],
)
