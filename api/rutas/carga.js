'use strict'
const express = require('express')
const asyncify = require('express-asyncify')
const db = require('db')
const api = asyncify(express.Router())
const xlstojson = require('xls-to-json-lc')
const xlsxtojson = require('xlsx-to-json-lc')
const map = require('lodash/map')
const multer = require('multer')
const {exportExcel} = require('configuracion')

let services, Carga

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now()
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
})//subir el archivo a la carpeta uploads
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'))
        }
        callback(null, true)
    }
}).single('excel')// verificar extencion de excel

api.use('*', async (req, res, next) => {
    if (!services) {
        try {
            services = await db()
        } catch (e) {
            next(e)
        }
        Carga = services.Carga
    }
    next()
})

/*subir archivo excel*/
api.post('/excel', async (req, res, next) => {
    let exceltojson
    upload(req, res, function (err) {
        if (err) {
            res.json({error_code: 1, err_desc: err})
            return
        }
        if (!req.file) {
            res.json({error_code: 1, err_desc: 'No file passed'})
            return
        }
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson
        } else {
            exceltojson = xlstojson
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null,
                lowerCaseHeaders: false
            }, async function (err, result) {
                if (err) {
                    return res.json({error_code: 1, err_desc: err, data: null})
                }
                res.json({error_code: 0, err_desc: null, data: result})
                const modelo = {}
                for (let row of result) {
                    map(exportExcel.exportExcel, (value, key) => {
                        modelo[value] = row[key] ? row[key] : null
                    })
                    await Carga.agregarDatos(modelo).then(console.log).catch(console.log)
                }
            })
        } catch (e) {
            res.json({error_code: 1, err_desc: 'Corupted excel file'})
        }
    })
})

module.exports = api