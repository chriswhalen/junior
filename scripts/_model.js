/* eslint-disable no-unused-vars */
/* global List, Record, bind, data, iterable, join */


class Model {

    constructor(root){

        if (root == null) throw new TypeError('root is required')

        this.root = root
    }

    new(params){

        if (iterable(params)){

            let records = []

            for (const record of params) records.push(new Proxy(new Record(this, record), bind.record))

            return new Proxy(new List(...records), bind.list)
        }

        return new Proxy(new Record(this, params), bind.record)
    }

    create(params){ return this.new(params).save() }

    query(query, cached){

        if (query == null) query = {}

        return data.get(this, query, cached).then((response)=> this.new(response))
    }

    get(id, cached){

        if (id) return this.query({id:id}, cached)

        return this.query({}, cached)
    }

    save(record){

        return data.save(this, record).then((response)=> record.fill(response))
    }

    delete(record){

        return data.delete(this, record).then((response)=> record.fill(response))
    }

    revert(record){

        return this.get(record.__id__).then((response)=> record.fill(response))
    }
}
