/* eslint-disable no-unused-vars */
/* global get */


class List extends Array {

    bind(...elements){

        let self = this

        if (!this.__bind__) this.__bind__ = []

        for (const element of elements){

            this.__bind__.push(element)
            element.addEventListener('input', (event)=>{

                let records = get(event.target)
                if (!(records instanceof Array)) records = [records]
                self.fill(...records)
            })
        }

        return this
    }

    fill(...records){

        this.length = 0
        for (const record of records) this.push(record)
    }

    save(){ return this.forEach((record)=> record.save()) }

    delete(){ return this.forEach((record)=> record.delete()) }

    revert(){ return this.forEach((record)=> record.revert()) }
}
