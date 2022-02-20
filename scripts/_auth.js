/* eslint-disable no-unused-vars */
/* global Model, Record, Token, auth, data */


class Auth {

    constructor(){ this.me = new Record(new Model('token'), data.cache.get('token')) }

    start(credentials){

        data.cache.clear()

        return Token.new(credentials).save().then((token)=>{

            if ('key' in token) delete token.key
            auth.me = Token.new(token)
        })
    }

    stop() {

        data.cache.clear()

        if (this.me) return this.me.delete().then(()=> delete auth.me)
        return new Promise((promise)=> promise(auth))
    }
}
