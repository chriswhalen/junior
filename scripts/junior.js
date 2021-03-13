/* eslint-disable no-unused-vars */
/* global Auth, Bind, Data, Page, ready */


require('util')

require('auth')
require('bind')
require('data')
require('list')
require('model')
require('page')
require('record')

let data = new Data()

let auth = new Auth()
let bind = new Bind()
let page = new Page()

let go = page.go
let render = page.render

window.on('popstate', ()=> page.open())

ready(()=> page.open())
