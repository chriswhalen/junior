/* eslint-disable no-unused-vars */
/* global echo, set */


class BindRecord {

    set(record, property, input){

        if (record[property] == input) return true
        record[property] = input

        if (property in record.__bind__) for (const element of record.__bind__[property])

            if (!element.matches(':focus')) set(element, record[property])

        return true
    }
}


class BindList {

    set(list, property, input){

        if (list[property] == input) return true
        list[property] = input

        for (const element of list.__bind__) if (!element.matches(':focus')) set(element, list)

        return true
    }
}


class Bind {

    constructor(){

        this.record = new BindRecord()
        this.list = new BindList()
    }
}

