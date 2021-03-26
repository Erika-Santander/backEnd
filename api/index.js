'use strict'

const http = require('http')
const minimist = require('minimist')
const express = require('express')
const asyncify = require('express-asyncify')
const cors = require('cors')
const {apiConfig} = require('configuracion')
const userRoute = require('./rutas/user')
const personRoute = require('./rutas/persona')
const cargarRoute = require('./rutas/carga')

const app = asyncify(express())
let server
server = http.createServer(app)
app.use(cors())
app.use(express.json())
app.use('/usuario',userRoute)
app.use('/persona',personRoute)
app.use('/import',cargarRoute)

app.use((err, req, res, next) => {
    if (err.code === 'permission_denied') {
        res.status(401).send(err.inner.message)
    } else if (err.message.match(/not fount/)) {
        return res.status(404).send({error: err.message})
    } else {
        return res.status(500).send({error: err.message})
    }
})

function handledFatalError(err) {
    console.error(`[fatal error]: ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

if (!module.parent) {
    process.on('uncaughtException', handledFatalError)
    process.on('unhandledRejection', handledFatalError)

    server.listen(apiConfig.apiConfig.port, () => {
        console.log(`[api-server]: escuchando por el puerto ${apiConfig.apiConfig.port}`)
    })
}
module.exports = server