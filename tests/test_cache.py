from junior.cache import cache, clear, delete, forget, get, memo, set, store


class TestCache:

    # Does the cache set and get simple values?
    def test_set_get_simple(self):

        set('a nice number', 42)

        assert get('a nice number') == 42

    # Does the cache set and get unicode strings?
    def test_set_get_unicode(self):

        set('a fancy string', '◎ܫ◎ ಠﭛಠ ⊙_ʘ ♨_♨ ಠ_ಠ')

        assert get('a fancy string') == '◎ܫ◎ ಠﭛಠ ⊙_ʘ ♨_♨ ಠ_ಠ'

    # Does the cache set and get lists?
    def test_set_get_list(self):

        set('a short list', ['one', 'two', 'three'])

        assert get('a short list') == ['one', 'two', 'three']

    # Does the cache set and get dicts?
    def test_set_get_dict(self):

        set('a little dict', {'un': 1, 'deux': 2, 'trois': 3})

        assert get('a little dict') == {'un': 1, 'deux': 2, 'trois': 3}

    # Does the cache delete values?
    def test_delete(self):

        set('baby', 'boy')

        assert get('baby') == 'boy'

        delete('baby')

        assert get('baby') is None

    # Does the cache clear?
    def test_clear(self):

        set('once upon', 'a time')
        set('i visited', 'the moon')

        assert get('once upon') == 'a time'
        assert get('i visited') == 'the moon'

        clear()

        assert get('once upon') is None
        assert get('i visited') is None
