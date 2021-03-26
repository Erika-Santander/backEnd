'use strict'

const minimist = require('minimist')
const config = {
    db: {
        base: {
            host: 'localhost',
            port: 3306,
            database: 'appangular',
            username: 'root',
            password: '',
            dialect: 'mysql',
            dialectOptions: {
                dateStrings: true,
                typeCast: true
            }
        },
    },

}
const apiConfig = {
    apiConfig: {
        port: 3000
    }
}
module.exports = {config, apiConfig}

