
require('lodash')
require('backbone')
require('sizzle')
require('jed')

require('view')
require('data')
require('auth')
require('page')

Backbone.history.start({pushState: true, silent: true})
Data.start('/api')


/* global Backbone, Data */
