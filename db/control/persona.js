'use strict'
module.exports= function setupPersona(personaModel){
    async function encontrarTodo(){
        return personaModel.findAll()
    }
    async function agregarDato(model) {
        return new Promise(async (resolve, reject) => {
            personaModel.create(model)
                .then(resultado => resolve(resultado))
                .catch(err => reject(err))
        })
    }
    async function actualizarDatos(model) {
        return new Promise(async (resolve, reject) => {
            personaModel.update(model, {where: {id: model.id}})
                .then(resultado => resolve(resultado))
                .catch(err => reject(err))
        })
    }
    async function eliminarDatos(model) {
        return new Promise(async (resolve, reject) => {
            personaModel.destroy({where: {id: model.id}})
                .then(resultado => resolve(resultado))
                .catch(err => reject(err))
        })
    }
        return{
            encontrarTodo,
            agregarDato,
            actualizarDatos,
            eliminarDatos
        }
    }
