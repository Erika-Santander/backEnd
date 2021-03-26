'use strict'

const {DataTypes}= require('sequelize')
const setupDatabase= require('../dbconfig/db')

module.exports=function setupPersonaModel(config){
    const sequelize=setupDatabase(config)
    return sequelize.define('persona', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        name: {
            type: DataTypes.STRING(250),
            allowNull: true,
            field: 'name'
        },
        lastname: {
            type: DataTypes.STRING(250),
            allowNull: true,
            field: 'lastname'
        },
        direccion: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'direccion'
        },
        age: {
            type: DataTypes.INTEGER(3),
            allowNull: true,
            field: 'age'
        },
    },{
        tableName:'persona',
        timestamps:false
    })
}