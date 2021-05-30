from datetime import datetime as dt
from json import loads
from os.path import join

package = {}

with open(join('..', 'package.json'), 'r') as file:
    package = loads(file.read())

project = package['name'].split('/')[-1]
release = package['version']
author = package['author']['name']
author_url = package['author']['url']

copyright = f' 2020, {dt.now().year}, <a href="{author_url}">{author}</a>'

html_theme = 'alabaster'
html_static_path = ['static']

exclude_patterns = []

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.intersphinx',
]

intersphinx_mapping = {

    'celery':
        ('https://docs.celeryproject.org/en/stable', None),

    'flask':
        ('https://flask.palletsprojects.com/en/2.0.x/', None),

    'flask_alembic':
        ('https://flask-alembic.readthedocs.io/en/latest/', None),

    'flask_assets':
        ('https://flask-assets.readthedocs.io/en/latest/', None),

    'flask_babel':
        ('https://flask-babel.tkte.ch/', None),

    'flask_caching':
        ('https://flask-caching.readthedocs.io/en/latest/', None),

    'flask_marshmallow':
        ('https://flask-marshmallow.readthedocs.io/en/latest/', None),

    'flask_restful':
        ('https://flask-restful.readthedocs.io/en/latest/', None),

    'flask_socketio':
        ('https://flask-socketio.readthedocs.io/en/latest/', None),

    'flask_sqlalchemy':
        ('https://flask-sqlalchemy.palletsprojects.com/en/2.x/', None),

    'jinja2':
        ('https://jinja.palletsprojects.com/en/3.0.x/', None),

    'marshmallow_sqlalchemy':
        ('https://marshmallow-sqlalchemy.readthedocs.io/en/latest/', None),

    'sqlalchemy':
        ('https://docs.sqlalchemy.org/en/14/', None),

    'werkzeug':
        ('https://werkzeug.palletsprojects.com/en/2.0.x/', None),
}

autodoc_typehints = 'description'
