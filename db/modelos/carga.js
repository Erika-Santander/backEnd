'use strict'

const {DataTypes}= require('sequelize')
const setupDatabase= require('../dbconfig/db')

module.exports=function setupCargaModel(config){
    const sequelize=setupDatabase(config)
    return sequelize.define('carga', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        nombre: {
            type: DataTypes.STRING(250),
            allowNull: true,
            field: 'nombre'
        },
        apellido: {
            type: DataTypes.STRING(250),
            allowNull: true,
            field: 'apellido'
        },
        ciudad: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'ciudad'
        },
        edad: {
            type: DataTypes.INTEGER(3),
            allowNull: true,
            field: 'edad'
        },
    },{
        tableName:'carga',
        timestamps:false
    })
}