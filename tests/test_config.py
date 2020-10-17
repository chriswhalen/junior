from junior.config import config


class TestConfig:

    # Does the configuration have a "name" entry?
    def test_name(self):

        assert(config.name is not None)
