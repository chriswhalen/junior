/* eslint-disable no-unused-vars */
/* global List, data, iterable, get */


class Record {

    constructor(model, properties){

        if (model == null) throw new TypeError('model is required')

        this.__bind__ = {}
        this.__model__ = model

        if (properties) this.fill(properties)
    }

    is(model){ return this.__model__ === model }

    bind(map){

        let self = this

        for (const property of Object.keys(map)){

            if (!iterable(map[property])) map[property] = [map[property]]

            if (!(property in this.__bind__)) this.__bind__[property] = []

            for (const item of map[property]){

                this.__bind__[property].push(item)

                item.addEventListener('input', (event)=> self[property] = get(event.target))
            }
        }

        return this
    }

    fill(properties){

        if (properties == null) return this

        for (const name of Object.keys(properties)){

            if (properties[name] instanceof Array){

                for (const model of Object.values(data.models))

                    if (name == model.root || name.endsWith(`_${model.root}`))

                        properties[name] = model.new(properties[name])
            }
            else if (properties[name] instanceof Object){

                for (const model of Object.keys(data.models))

                    if (name == model.toLowerCase() || name.endsWith(`_${model.toLowerCase()}`))

                        properties[name] = data.models[model].new(properties[name])
            }

            if (name == 'id') this.__id__ = properties[name]
            this[name] = properties[name]
        }

        return this
    }

    save(){ return this.__model__.save(this) }

    delete(){ return this.__model__.delete(this) }

    revert(){ return this.__model__.revert(this) }
}

