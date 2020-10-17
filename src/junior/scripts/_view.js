_.templateSettings.escape = /\{\{-(.+?)\}\}/g
_.templateSettings.evaluate = /\{\{!(.+?)\}\}/g
_.templateSettings.interpolate = /\{\{(.+?)\}\}/g

const component =(name)=> `/_/${name}`

const debug =(message)=>{

    if (_.isUndefined(message)) console.log(message)
    else console.log(JSON.parse(JSON.stringify(message)))
}

const now =()=> window.performance.now().toString().replace('.', '')

const render =(name, target, context)=>{

    let id = `${name}-${now()}`
    let source = `<source id="${id}">`

    if (_.isUndefined(context)) context = {}

    let request = fetch(component(name)).
        then((response)=> response.text()).
        then((text)=> {

            let dom = $(_.template(text)(context))

            dom.find('a, img').attr('draggable', false)
            dom.find('a').click((event)=>{

                let href = $(event.target).parents('a').attr('href')
                if (href) Page.navigate(href, {trigger: true})

                return false
            })

            $(`source#${id}`).replaceWith(dom)
        })

    if (target) {

        $(target).html(source)
        return request
    }

    return source
}


/* global _, $, Page */
