const Auth ={

    token: localStorage.getItem('Auth.token'),

    start: (credentials)=>{

        let token = Data.Token.add(credentials)

        token.save().then(()=>{

            Auth.token = Data.Token.models.pop().id
            localStorage.setItem('Auth.token', Auth.token)
        })
    }
}

/* global Data */
