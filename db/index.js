'use strict'
const {config} = require('config');
const setupDataBase = require('./dbconfig/db')
const defaults = require('defaults')

/*modelos*/
const setupUserModel = require('./modelos/user')
const setupPersonaModel = require('./modelos/persona')

/*control*/
const setupUser = require('./control/user')
const setupPersona = require('./control/persona')

module.exports = async function () {
    const dbConfig = defaults({
        logging: console.log,
        query: {
            raw: true
        }
    }, config.db.base)

    const userModel = setupUserModel(dbConfig)
   const personaModel = setupPersonaModel(dbConfig)

    const User = setupUser(userModel)
    const Persona = setupPersona(personaModel)

    return {
        User,
        Persona
    }
}