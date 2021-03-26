'use strict'
const express = require('express')
const asyncify = require('express-asyncify')
const db = require('db')
const api = asyncify(express.Router())

let services, Persona
api.use('*', async (req, res, next) => {
    if (!services) {
        try {
            services = await db()
        } catch (e) {
            next(e)
        }
        Persona = services.Persona
    }
    next()
})
api.get('/encontrarTodo', async (req, res, next) => {
    let resultado = null
    try {
        resultado = await Persona.encontrarTodo()
        res.send(resultado)
    } catch (e) {
        return next(e)
    }
})
api.post('/agregarDato', async (req, res, next) => {
    const model = req.body
    let resultado = null
    try {
        resultado = await Persona.agregarDato(model)
        res.send(resultado)
    } catch (e) {
        return next(e)
    }
})
api.post('/actualizaDatos', async (req, res, next) => {
    const model = req.body
    let resultado = null
    try {
        resultado = await Persona.actualizarDatos(model)
        res.send(resultado)
    } catch (e) {
        return next(e)
    }
})
api.post('/eliminarDatos', async (req, res, next) => {
    const model = req.body
    let resultado = null
    try {
        resultado = await Persona.eliminarDatos(model)
        res.send(true)
    } catch (e) {
        return next(e)
    }
})
module.exports = api
