/* eslint-disable no-unused-vars */
/* global Model, auth, data, join, strip */


class Data {

    constructor(root, start){

        if (root == null) root = 'api'
        if (start == null) start = true

        this.root = root
        this.models = {}

        this.cache = {

            get: (path)=> {

                if (path == null) throw new TypeError('path is required')

                path = strip(path.replace(data.root, ''))

                return JSON.parse(localStorage.getItem(path))
            },

            put: (path, record)=>{

                if (path == null) throw new TypeError('path is required')
                if (record == null) record = {}

                path = strip(path.replace(data.root, ''))

                localStorage.setItem(path, JSON.stringify(record))

                return localStorage.getItem(path)
            },

            delete: (path)=>{

                if (path == null) throw new TypeError('path is required')
                path = strip(path.replace(data.root, ''))

                let record = JSON.parse(localStorage.getItem(path))

                localStorage.removeItem(path)

                return record
            },

            clear: ()=> localStorage.clear()
        }

        if (start) this.start()
    }

    start(){

        return fetch(this.root).then((response)=>response.json()).then((api)=>{

            data.root = strip(api.root)
            data.updated_at = api.updated_at
            data.version = api.version

            for (const name of Object.keys(api.endpoints))

                data.new(name, api.endpoints[name].replace(api.root, ''))
        })

    }

    new(name, root){

        if (name == null) throw new TypeError('name is required')

        if (root) root = strip(root)
        else root = `${name}s`.toLowerCase()

        this.models[name] = new Model(root)
        window[name] = this.models[name]

        return this.models[name]
    }

    get(model, params, cached){

        if (model == null) throw new TypeError('model is required')
        if (params == null) params = {}
        if (cached == null) cached = true

        let path = ['', this.root, model.root, join(params)].join('/')
        let request = {method: 'GET'}

        let record = this.cache.get(path)

        if (record && cached) return new Promise((promise)=> promise(record))

        if (auth.me) request.headers = {Authorization: auth.me.token}

        return fetch(path, request).then((body)=>body.json()).then((response)=>{

            data.cache.put(path, response)
            return response
        })
    }

    save(model, params){

        if (model == null) throw new TypeError('model is required')
        if (params == null) params = {}

        let path = ['', this.root, model.root].join('/')
        let request = {method: 'POST', body: JSON.stringify(params)}

        if (auth.me) request.headers = {Authorization: auth.me.token}

        if ('id' in params){

            path = [path, params.id].join('/')
            request.method = 'PUT'
        }

        return fetch(path, request).then((body)=>body.json()).then((response)=>{

            data.cache.put(path, response)
            return response
        })
    }

    delete(model, params){

        if (model == null) throw new TypeError('model is required')
        if (params == null) params = {}

        let path = ['', this.root, model.root].join('/')
        let request = {method: 'DELETE'}

        if (auth.me) request.headers = {Authorization: auth.me.token}

        if ('id' in params) path = [path, params.id].join('/')

        return fetch(path, request).then((body)=>body.json()).then((response)=>{

            data.cache.delete(path)
            return response
        })
    }
}


