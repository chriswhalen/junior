#!/usr/bin/env python


from setuptools import setup


with open('README.md', 'r') as file:
    readme = file.read()


setup(
    name='junior',
    version='0.2.2',
    url='https://gitlab.com/chriswhalen/junior',
    license='MIT',
    author='Chris Whalen',
    author_email='chris@chriswhalen.ca',
    description='An opinionated Flask project structure.',
    long_description=readme,
    long_description_content_type='text/markdown',
    packages=['junior'],
    package_data={'junior': ['config/*',
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
        'bcrypt~=3.1',
        'celery~=4.4',
        'flask~=1.1',
        'flask-alembic~=2.0',
        'flask-assets~=0.12',
        'flask-babel~=1.0',
        'flask-caching~=1.9',
        'flask-marshmallow~=0.12',
        'flask-restful~=0.3',
        'flask-security-too~=3.3',
        'flask-socketio~=4.3',
        'flask-sqlalchemy~=2.4',
        'gunicorn~=20.0',
        'hamlish-jinja~=0.3',
        'konch~=4.2',
        'marshmallow~=3.6',
        'marshmallow-sqlalchemy~=0.23',
        'munch~=2.3',
        'mysqlclient~=1.4',
        'psycopg2~=2.8',
        'pyyaml~=5.3',
        'readline~=6.2',
        'sqlalchemy~=1.3',
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
