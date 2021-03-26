'use strict'
const {config} = require('config');
const setupDataBase = require('./dbconfig/db')
const defaults = require('defaults')

/*modelos*/
const setupUserModel = require('./modelos/user')
const setupPersonaModel = require('./modelos/persona')
const setupCargaModel = require('./modelos/carga')
/*control*/
const setupUser = require('./control/user')
const setupPersona = require('./control/persona')
const setupCarga = require('./control/carga')

module.exports = async function () {
    const dbConfig = defaults({
        logging: console.log,
        query: {
            raw: true
        }
    }, config.db.base)

    const userModel = setupUserModel(dbConfig)
    const personaModel = setupPersonaModel(dbConfig)
    const cargaModel = setupCargaModel(dbConfig)

    const User = setupUser(userModel)
    const Persona = setupPersona(personaModel)
    const Carga = setupCarga(cargaModel)
    return {
        User,
        Persona,
        Carga
    }
}