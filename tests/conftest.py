from junior import Application

from pytest import fixture


app = Application()


# application fixture
@fixture(autouse=True)
def application():

    return app
