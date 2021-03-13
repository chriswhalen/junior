document.on=document.addEventListener
window.on=window.addEventListener
console.echo=(value)=>console.log(echo(value))
let dom=new DOMParser()
let property=Object.defineProperty
let now=()=>window.performance.now().toString().replace('.','').padEnd(16,'0').slice(0,16)
let $=(selector)=>document.querySelector(selector)
let $$=(selector)=>document.querySelectorAll(selector)
let defined=(value)=>value!=null
let iterable=(value)=>Symbol.iterator in Object(value)
let all=(list)=>{if(!defined(list))throw new TypeError('list argument is required')
if(!list.length)return true
if(list instanceof Array)return list.reduce((p,q)=>p&&q)
return Array(...list).reduce((p,q)=>p&&q)}
let any=(list)=>{if(!defined(list))throw new TypeError('list argument is required')
if(!list.length)return false
if(list instanceof Array)return list.reduce((p,q)=>p||q)
return Array(...list).reduce((p,q)=>p||q)}
let component=(name)=>{if(!defined(name))throw new TypeError('name argument is required')
return`/_/${name}`}
let create=(name)=>{if(!defined(name))throw new TypeError('name argument is required')
return document.createElement(name)}
let echo=(value)=>{if(!defined(value))throw new TypeError('value argument is required')
value=JSON.parse(JSON.stringify(value))
for(const key of Object.keys(value)){if(key.startsWith('__')&&key.endsWith('__'))delete value[key]
if(value[key]instanceof Object)value[key]=echo(value[key])}
return value}
let html=(text)=>{if(!defined(text))text=''
return dom.parseFromString(text,'text/html')}
let join=(params,separator)=>{if(!defined(params))throw new TypeError('params argument is required')
if(!separator)separator='/'
let path=[]
let names=Object.keys(params)
if(names.includes('id'))path.push(params['id'])
for(const name of names)if(name!=='id'){path.push(name)
path.push(params[name])}
return path.join(separator)}
let parents=(element,selector)=>{let elements=[]
for(;element&&element!==document;element=element.parentNode)
if(!defined(selector)||element.matches(selector))elements.push(element)
return elements}
let ready=(handler)=>{if(!defined(handler))throw new TypeError('handler argument is required')
document.on('DOMContentLoaded',handler)}
let strip=(value,separator)=>{if(!defined(value))throw new TypeError('value argument is required')
if(!separator)separator='/'
let _value=value
if(value.startsWith(separator))value=value.slice(1)
if(value.endsWith(separator))value=value.slice(0,-1)
if(_value==value)return value
return strip(value)}
let get=(target)=>{if(!defined(target))throw new TypeError('target argument is required')
if(['checkbox','radio'].includes(target.type)){if(target.checked)return target.value
return null}
if(defined(target.currentSrc))return target.src
if(defined(target.options)){if(target.multiple)return Array(...target.selectedOptions).map((option)=>option.value)
if(target.selectedOptions[0])return target.selectedOptions[0].value
return null}
if(defined(target.value))return target.value
if(defined(target.childNodes)){if(target.childNodes.length==1&&target.childNodes[0]instanceof String)
return target.childNodes[0]
return Array(...target.childNodes).map((node)=>get(node))}
if(defined(target.textContent))return target.textContent
if(target.length>1)return Array(...target).map((node)=>get(node))
return target}
let set=(target,value)=>{if(!defined(target))throw new TypeError('target argument is required')
if(!defined(value))throw new TypeError('value argument is required')
if(['checkbox','radio'].includes(target.type)){if(value instanceof Array)target.checked=value.includes(target.value)
else target.checked=value.replaceAll(', ',',').includes(target.value.replaceAll(', ',','))
return get(target)}
if(defined(target.currentSrc)){target.src=value
return get(target)}
if(defined(target.options))for(const option of target.options){if(value instanceof Array)option.selected=value.includes(option.value)
else option.selected=value.replaceAll(', ',',').includes(option.value.replaceAll(', ',','))
return get(target)}
if(defined(target.value)){if(value instanceof Array)value=value.join(', ')
target.value=value
return get(target)}
if(value instanceof Array){value=value.map((item)=>{let li=create('li')
li.textContent=item
return li})
target.textContent=''
for(const li of value)target.appendChild(li)
return get(target)}
if(target.textContent){target.textContent=value
return get(target)}
if(target.length>1)return Array(...target).map((node)=>set(node,value))
return get(target)}
class Auth{constructor(){this.me=new Record(new Model('token'),data.cache.get('token'))}
start(credentials){data.cache.clear()
return Token.new(credentials).save().then((token)=>{if('key'in token)delete token.key
auth.me=Token.new(token)})}
stop(){data.cache.clear()
if(this.me)return this.me.delete().then(()=>delete auth.me)
return new Promise((promise)=>promise(auth))}}
class BindRecord{set(record,property,input){if(record[property]==input)return true
record[property]=input
if(property in record.__bind__)for(const element of record.__bind__[property])
if(!element.matches(':focus'))set(element,record[property])
return true}}
class BindList{set(list,property,input){if(list[property]==input)return true
list[property]=input
for(const element of list.__bind__)if(!element.matches(':focus'))set(element,list)
return true}}
class Bind{constructor(){this.record=new BindRecord()
this.list=new BindList()}}
class Data{constructor(root,start){if(root==null)root='api'
if(start==null)start=true
this.root=root
this.models={}
this.cache={get:(path)=>{if(path==null)throw new TypeError('path is required')
path=strip(path.replace(data.root,''))
return JSON.parse(localStorage.getItem(path))},put:(path,record)=>{if(path==null)throw new TypeError('path is required')
if(record==null)record={}
path=strip(path.replace(data.root,''))
localStorage.setItem(path,JSON.stringify(record))
return localStorage.getItem(path)},delete:(path)=>{if(path==null)throw new TypeError('path is required')
path=strip(path.replace(data.root,''))
let record=JSON.parse(localStorage.getItem(path))
localStorage.removeItem(path)
return record},clear:()=>localStorage.clear()}
if(start)this.start()}
start(){return fetch(this.root).then((response)=>response.json()).then((api)=>{data.root=strip(api.root)
data.updated_at=api.updated_at
data.version=api.version
for(const name of Object.keys(api.endpoints))
data.new(name,api.endpoints[name].replace(api.root,''))})}
new(name,root){if(name==null)throw new TypeError('name is required')
if(root)root=strip(root)
else root=`${name}s`.toLowerCase()
this.models[name]=new Model(root)
window[name]=this.models[name]
return this.models[name]}
get(model,params,cached){if(model==null)throw new TypeError('model is required')
if(params==null)params={}
if(cached==null)cached=true
let path=['',this.root,model.root,join(params)].join('/')
let request={method:'GET'}
let record=this.cache.get(path)
if(record&&cached)return new Promise((promise)=>promise(record))
if(auth.me)request.headers={Authorization:auth.me.token}
return fetch(path,request).then((body)=>body.json()).then((response)=>{data.cache.put(path,response)
return response})}
save(model,params){if(model==null)throw new TypeError('model is required')
if(params==null)params={}
let path=['',this.root,model.root].join('/')
let request={method:'POST',body:JSON.stringify(params)}
if(auth.me)request.headers={Authorization:auth.me.token}
if('id'in params){path=[path,params.id].join('/')
request.method='PUT'}
return fetch(path,request).then((body)=>body.json()).then((response)=>{data.cache.put(path,response)
return response})}
delete(model,params){if(model==null)throw new TypeError('model is required')
if(params==null)params={}
let path=['',this.root,model.root].join('/')
let request={method:'DELETE'}
if(auth.me)request.headers={Authorization:auth.me.token}
if('id'in params)path=[path,params.id].join('/')
return fetch(path,request).then((body)=>body.json()).then((response)=>{data.cache.delete(path)
return response})}}
class List extends Array{bind(...elements){let self=this
if(!this.__bind__)this.__bind__=[]
for(const element of elements){this.__bind__.push(element)
element.addEventListener('input',(event)=>{let records=get(event.target)
if(!(records instanceof Array))records=[records]
self.fill(...records)})}
return this}
fill(...records){this.length=0
for(const record of records)this.push(record)}
save(){return this.forEach((record)=>record.save())}
delete(){return this.forEach((record)=>record.delete())}
revert(){return this.forEach((record)=>record.revert())}}
class Model{constructor(root){if(root==null)throw new TypeError('root is required')
this.root=root}
new(params){if(iterable(params)){let records=[]
for(const record of params)records.push(new Proxy(new Record(this,record),bind.record))
return new Proxy(new List(...records),bind.list)}
return new Proxy(new Record(this,params),bind.record)}
create(params){return this.new(params).save()}
query(query,cached){if(query==null)query={}
return data.get(this,query,cached).then((response)=>this.new(response))}
get(id,cached){if(id)return this.query({id:id},cached)
return this.query({},cached)}
save(record){return data.save(this,record).then((response)=>record.fill(response))}
delete(record){return data.delete(this,record).then((response)=>record.fill(response))}
revert(record){return this.get(record.__id__).then((response)=>record.fill(response))}}
class Page{constructor(root){if(root==null)root=$('body')
this.root=root
this.pages={}}
add(path,component){path=strip(path)
if(component==null)component=path.replaceAll('/','_')
this.pages[path]=(context)=>this.render(component,this.root,context)
return this}
go(path,context,title){if(path==null)path=location.pathname
path=strip(path)
if(context==null)context={}
if(title==null)title=path.replaceAll('/',' ')
history.pushState(context,title,`/${path}`)
return this}
open(path,context){if(path==null)path=location.pathname
path=strip(path)
if(context==null)context={}
if(this.pages[path])this.pages[path](context)
return this}
render(name,target,context){if(name==null)throw new TypeError('name is required')
if(context==null)context={}
let source=document.createElement('source')
source.id=`${name}-${now()}`
let params={}
if(auth.me)params.headers={Authorization:auth.me.token}
let request=fetch(component(name),params).then((response)=>response.text()).then((text)=>{Array(...html(text).body.childNodes).forEach((node)=>{if(node instanceof HTMLScriptElement){let script=create('script')
script.textContent=node.textContent
node=script}
source.parentNode.appendChild(node)})
source.remove()})
if(target){target.appendChild(source)
return request}
return source}}
class Record{constructor(model,properties){if(model==null)throw new TypeError('model is required')
this.__bind__={}
this.__model__=model
if(properties)this.fill(properties)}
is(model){return this.__model__===model}
bind(map){let self=this
for(const property of Object.keys(map)){if(!iterable(map[property]))map[property]=[map[property]]
if(!(property in this.__bind__))this.__bind__[property]=[]
for(const item of map[property]){this.__bind__[property].push(item)
item.addEventListener('input',(event)=>self[property]=get(event.target))}}
return this}
fill(properties){if(properties==null)return this
for(const name of Object.keys(properties)){if(properties[name]instanceof Array){for(const model of Object.values(data.models))
if(name==model.root||name.endsWith(`_${model.root}`))
properties[name]=model.new(properties[name])}
else if(properties[name]instanceof Object){for(const model of Object.keys(data.models))
if(name==model.toLowerCase()||name.endsWith(`_${model.toLowerCase()}`))
properties[name]=data.models[model].new(properties[name])}
if(name=='id')this.__id__=properties[name]
this[name]=properties[name]}
return this}
save(){return this.__model__.save(this)}
delete(){return this.__model__.delete(this)}
revert(){return this.__model__.revert(this)}}
let data=new Data()
let auth=new Auth()
let bind=new Bind()
let page=new Page()
let go=page.go
let render=page.render
window.on('popstate',()=>page.open())
ready(()=>page.open())