/* eslint-disable no-unused-vars */
/* global $, auth, component, create, html, now, strip */


class Page {

    constructor(root){

        if (root == null) root = $('body')

        this.root = root
        this.pages = {}
    }

    add(path, component){

        path = strip(path)

        if (component == null) component = path.replaceAll('/', '_')

        this.pages[path] = (context)=> this.render(component, this.root, context)

        return this
    }

    go(path, context, title){

        if (path == null) path = location.pathname
        path = strip(path)

        if (context == null) context = {}
        if (title == null) title = path.replaceAll('/', ' ')

        history.pushState(context, title, `/${path}`)

        return this
    }

    open(path, context){

        if (path == null) path = location.pathname
        path = strip(path)

        if (context == null) context = {}

        if (this.pages[path]) this.pages[path](context)

        return this
    }

    render(name, target, context){

        if (name == null) throw new TypeError('name is required')

        if (context == null) context = {}

        let source = document.createElement('source')
        source.id = `${name}-${now()}`

        let params = {}
        if (auth.me) params.headers = {Authorization: auth.me.token}

        let request = fetch(component(name), params).then((response)=> response.text()).then((text)=>{

            Array(...html(text).body.childNodes).forEach((node)=>{

                if (node instanceof HTMLScriptElement){

                    let script = create('script')
                    script.textContent = node.textContent
                    node = script
                }

                source.parentNode.appendChild(node)
            })

            source.remove()
        })

        if (target) {

            target.appendChild(source)
            return request
        }

        return source
    }
}
