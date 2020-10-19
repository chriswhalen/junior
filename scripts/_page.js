const Router = Backbone.Router.extend({

    routes: {
        '': 'index'
    },

    reload: ()=>{
        let path = location.pathname.substring(1)
        if (!_.isUndefined(Page.routes[path])) Page[Page.routes[path]]()
    },

})

const Page = new Router()


/* global _, Backbone */
