from flask_caching import Cache

store = Cache()

cache = store.cached

memo = store.memoize
forget = store.delete_memoized

clear = store.clear
delete = store.delete

get = store.get
set = store.set
