from junior import Application


class TestApplication:

    application = Application('junior')

    # Will the application start?
    def test_start(self):

        self.application.start()

    # Is the application's import name correct?
    def test_import_name(self):

        assert self.application.import_name == 'junior'
