Get Started
===========

junior is fun and easy! Let's learn more about how it works.


Install junior
--------------

junior is powered by
`the Python programming language <https://www.python.org/>`_.
If you're new to Python, please visit this link, find a download for your
platform, and spend some time learning about the language and its syntax.
Most `Linux <https://www.kernel.org/doc/html/latest/>`_ and UNIX package
managers offer users a package for the latest version of Python.

junior requires Python version 3.7 or higher, along with
the ``pip`` package manager. It's also recommended we use
`virtualenv <https://virtualenv.pypa.io/en/latest/>`_
to create a virtual environment for our junior applications.

Let's start by installing ``virtualenv``, along with its companion
``virtualenvwrapper``::

    $ pip install virtualenv virtualenvwrapper

    # some users may want to try this instead:
    $ pip install --user virtualenv virtualenvwrapper

With ``virtualenv`` and ``virtualenvwrapper`` installed, we can create a new
virtual environment to store the packages we install using ``pip``.
