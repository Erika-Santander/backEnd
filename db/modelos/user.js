'use strict'

const { DataTypes } = require('sequelize')
const setupDatabase = require('../dbconfig/db')

module.exports = function setupUserModel (config) {
    const sequelize = setupDatabase(config)
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        nombreCompleto: {
            type: DataTypes.STRING(250),
            allowNull: true,
            field: 'nombre_completo'
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'username'
        },
        password: {
            type: DataTypes.STRING(15),
            allowNull: false,
            field: 'password'
        },
        edad: {
            type: DataTypes.INTEGER(3),
            allowNull: true,
            field: 'edad'
        },
        fechaNacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'fecha_nacimiento'
        },
        estado: {
            type: DataTypes.STRING(15),
            allowNull: false,
            field: 'estado'
        },

    }, {
        tableName: 'user',
        timestamps: false
    })
}