'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const db = require('db')
const api = asyncify(express.Router())

let services, User
api.use('*', async (req, res, next) => {
    if (!services) {
        try {
            services = await db()
        } catch (e) {
            next(e)
        }
        User = services.User
    }
    next()
})
api.get('/encuentraTodo', async (req, res, next) => {
    let resultado = null
    try {
        resultado = await User.encuentraTodo()
        res.send(resultado)
    } catch (e) {
        return next(e)
    }
})
api.post('/insertarRegistro', async (req, res, next) => {
    const model = req.body
    let resultado = null
    try {
        resultado = await User.insertarRegistro(model)
        res.send(resultado)
    } catch (e) {
        return next(e)
    }
})
api.post('/actualizaDatos', async (req, res, next) => {
    const model = req.body
    let resultado = null
    try {
        resultado = await User.actualizarDatos(model)
        res.send(resultado)
    } catch (e) {
        return next(e)
    }
})
api.post('/eliminarDatos', async (req, res, next) => {
    const model = req.body
    let resultado = null
    try {
        resultado = await User.eliminarDatos(model)
        res.send(true)
    } catch (e) {
        return next(e)
    }
})


module.exports = api