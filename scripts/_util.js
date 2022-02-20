/* eslint-disable no-unused-vars */


document.on = document.addEventListener
window.on = window.addEventListener

console.echo =(value)=> console.log(echo(value))

let dom = new DOMParser()

let property = Object.defineProperty

let now =()=> window.performance.now().toString().replace('.', '').padEnd(16, '0').slice(0, 16)

let $ =(selector)=> document.querySelector(selector)

let $$ =(selector)=> document.querySelectorAll(selector)

let defined =(value)=> value != null

let iterable =(value)=> Symbol.iterator in Object(value)

let all =(list)=>{

    if (!defined(list)) throw new TypeError('list argument is required')

    if (!list.length) return true

    if (list instanceof Array) return list.reduce((p, q)=> p && q)

    return Array(...list).reduce((p, q)=> p && q)
}

let any =(list)=>{

    if (!defined(list)) throw new TypeError('list argument is required')

    if (!list.length) return false

    if (list instanceof Array) return list.reduce((p, q)=> p || q)

    return Array(...list).reduce((p, q)=> p || q)
}

let component =(name)=>{

    if (!defined(name)) throw new TypeError('name argument is required')

    return `/_/${name}`
}

let create =(name)=>{

    if (!defined(name)) throw new TypeError('name argument is required')

    return document.createElement(name)
}

let echo =(value)=>{

    if (!defined(value)) throw new TypeError('value argument is required')

    value = JSON.parse(JSON.stringify(value))

    for (const key of Object.keys(value)) {

        if (key.startsWith('__') && key.endsWith('__')) delete value[key]

        if (value[key] instanceof Object) value[key] = echo(value[key])
    }

    return value
}

let html =(text)=>{

    if (!defined(text)) text = ''

    return dom.parseFromString(text, 'text/html')
}

let join =(params, separator)=>{

    if (!defined(params)) throw new TypeError('params argument is required')

    if (!separator) separator = '/'

    let path = []
    let names = Object.keys(params)

    if (names.includes('id')) path.push(params['id'])

    for (const name of names) if (name !== 'id'){

        path.push(name)
        path.push(params[name])
    }

    return path.join(separator)
}

let parents =(element, selector)=>{

    let elements = []

    for (; element && element !== document; element = element.parentNode)
        if (!defined(selector) || element.matches(selector)) elements.push(element)

    return elements
}

let ready =(handler)=>{

    if (!defined(handler)) throw new TypeError('handler argument is required')

    document.on('DOMContentLoaded', handler)
}

let strip =(value, separator)=>{

    if (!defined(value)) throw new TypeError('value argument is required')

    if (!separator) separator = '/'

    let _value = value

    if (value.startsWith(separator)) value = value.slice(1)
    if (value.endsWith(separator)) value = value.slice(0,-1)

    if (_value == value) return value

    return strip(value)
}

let get =(target)=>{

    if (!defined(target)) throw new TypeError('target argument is required')

    if (['checkbox', 'radio'].includes(target.type)){

        if (target.checked) return target.value

        return null
    }

    if (defined(target.currentSrc)) return target.src

    if (defined(target.options)){

        if (target.multiple) return Array(...target.selectedOptions).map((option)=> option.value)

        if (target.selectedOptions[0]) return target.selectedOptions[0].value

        return null
    }

    if (defined(target.value)) return target.value

    if (defined(target.childNodes)) {

        if (target.childNodes.length == 1 && target.childNodes[0] instanceof String)
            return target.childNodes[0]

        return Array(...target.childNodes).map((node)=> get(node))
    }

    if (defined(target.textContent)) return target.textContent

    if (target.length > 1) return Array(...target).map((node)=> get(node))

    return target
}

let set =(target, value)=>{

    if (!defined(target)) throw new TypeError('target argument is required')
    if (!defined(value)) throw new TypeError('value argument is required')

    if (['checkbox', 'radio'].includes(target.type)){

        if (value instanceof Array) target.checked = value.includes(target.value)
        else target.checked = value.replaceAll(', ',',').includes(target.value.replaceAll(', ',','))

        return get(target)
    }

    if (defined(target.currentSrc)) {

        target.src = value

        return get(target)
    }

    if (defined(target.options)) for (const option of target.options) {

        if (value instanceof Array) option.selected = value.includes(option.value)
        else option.selected = value.replaceAll(', ',',').includes(option.value.replaceAll(', ',','))

        return get(target)
    }

    if (defined(target.value)){

        if (value instanceof Array) value = value.join(', ')
        target.value = value

        return get(target)
    }

    if (value instanceof Array) {

        value = value.map((item)=>{

            let li = create('li')
            li.textContent = item

            return li
        })

        target.textContent = ''
        for (const li of value) target.appendChild(li)

        return get(target)
    }

    if (target.textContent) {

        target.textContent = value
        return get(target)
    }

    if (target.length > 1) return Array(...target).map((node)=> set(node, value))

    return get(target)
}
