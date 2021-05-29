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
    project_urls={
        'Documentation': 'https://itsjunior.readthedocs.io',
        'Source': 'https://github.com/chriswhalen/junior',
        'Issues': 'https://github.com/chriswhalen/junior/issues',
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
        'alembic==1.6.5',
        'amqp==5.0.6',
        'autopep8==1.5.7',
        'bcrypt==3.2.0',
        'celery==5.0.5',
        'cffi==1.14.5',
        'click==7.1.2',
        'flask==2.0.0',
        'flask-alembic==2.0.1',
        'flask-assets==2.0',
        'flask-babel==2.0.0',
        'flask-caching==1.10.1',
        'flask-mailman==0.2.3',
        'flask-marshmallow==0.14.0',
        'flask-restful==0.3.9',
        'flask-socketio==5.0.3',
        'flask-sqlalchemy==2.5.1',
        'gunicorn==20.1.0',
        'hamlish-jinja==0.3.3',
        'itsdangerous==2.0.1',
        'jinja2==3.0.0',
        'konch==4.3.0',
        'mako==1.1.4',
        'marshmallow==3.12.1',
        'marshmallow-sqlalchemy==0.26.0',
        'munch==2.5.0',
        'mysqlclient==2.0.3',
        'psycopg2==2.8.6',
        'python-dateutil==2.8.1',
        'python-editor==1.0.4',
        'python-engineio==4.2.0',
        'pyyaml==5.4.1',
        'readline==6.2.4.1',
        'sqlalchemy==1.4.15',
        'sqlalchemy-migrate==0.13.0',
        'toml==0.10.2',
        'webassets==2.0',
        'whitenoise==5.2.0'
    ],
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
