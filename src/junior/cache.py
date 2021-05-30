from flask_caching import Cache

#: A :class:`~flask_caching.Cache`
#: to store data to the file system for later retrieval.
#: :attr:`store` uses :class:`~flask_caching.backends.FileSystemCache`
#: as its default cache provider.
store = Cache()

#: Add a function to :attr:`store`.
#: We can use :attr:`cache` as a decorator.
#: :attr:`cache` is an alias of :attr:`~flask_caching.Cache.cached`.
cache = store.cached

#: Add a function call's return value to :attr:`store`
#: using its arguments as a key.
#: We can use :attr:`memo` as a decorator.
#: :attr:`memo` is an alias of :attr:`~flask_caching.Cache.memoize`.
memo = store.memoize

#: Delete or clear memoized functions from :attr:`store`.
#: :attr:`forget` is an alias of :attr:`~flask_caching.Cache.delete_memoized`.
forget = store.delete_memoized

#: Clear all items from :attr:`store`.
#: :attr:`clear` is an alias of
#: :attr:`~flask_caching.backends.FileSystemCache.clear`.
clear = store.clear

#: Delete items from :attr:`store`.
#: :attr:`delete` is an alias of
#: :attr:`~flask_caching.backends.FileSystemCache.delete`.
delete = store.delete

#: Add a new item to :attr:`store`.
#: :attr:`add` is an alias of
#: :attr:`~flask_caching.backends.FileSystemCache.add`.
add = store.add

#: Get an item from :attr:`store`.
#: :attr:`get` is an alias of
#: :attr:`~flask_caching.backends.FileSystemCache.get`.
get = store.get

#: Add an item to :attr:`store`.
#: :attr:`set` is an alias of
#: :attr:`~flask_caching.backends.FileSystemCache.set`.
set = store.set
