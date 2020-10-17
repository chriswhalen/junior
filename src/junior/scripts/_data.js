const Data ={

    start: (location)=>{

        return fetch(location).then((response)=> response.json().then((api)=>{

            _(api.endpoints).each((path, name)=>{

                let Collection = Backbone.Collection.extend({

                    all: function(){ return this.toJSON() },

                    model: (attributes, params)=>{

                        let model = new Backbone.Model(attributes, params)
                        return new Proxy(model, GetSet)
                    },

                    url: path
                })

                let collection = new Collection
                collection.fetch()

                Data[name] = new Proxy(collection, GetSet)
            })
        }))
    }
}

const GetSet ={

    get: (target, name)=>{ if (target.get(name)){ return target.get(name) } return target[name] },
    set: (target, name, value)=>{ if (target.get(name)){ target.set(name, value) } target[name] = value }
}

Backbone.sync =(action, resource, params)=>{

    console.log(action, resource, params)

    const actions ={

        read: {},
        create: { method: 'POST', body: JSON.stringify(resource) },
        update: { method: 'PUT',  body: JSON.stringify(resource) },
        delete: { method: 'DELETE' }
    }

    if (_.isUndefined(resource)) return resource

    let url = resource.url
    if (_.isFunction(resource.url)) url = resource.url()

    actions[action].headers = { 'Content-Type': 'application/json' }
    if (Auth.token) actions[action].headers.Authorization = Auth.token

    return fetch(url, actions[action]).
            then((response)=> response.json().then((body)=> resource.set(body)))
}


/* global _, Auth, Backbone */
