'use strict'

module.exports = function setupUser(userModel) {
    /*el modelo es userModel*/
    async function encuentraTodo() {
        return userModel.findAll()
    }

    /*los datos a guardar se reciben en el model */
    async function insertarRegistro(model) {
        return new Promise(async (resolve, reject) => {
            userModel.create(model)
                .then(resultado => resolve(resultado))
                .catch(err => reject(err))
        })
    }

    async function actualizarDatos(model) {
        return new Promise(async (resolve, reject) => {
            userModel.update(model, {where: {id: model.id}})
                .then(resultado => resolve(resultado))
                .catch(err => reject(err))
        })
    }
        async function eliminarDatos(model) {
            return new Promise(async (resolve, reject) => {
                userModel.destroy({where: {id: model.id}})
                    .then(resultado => resolve(resultado))
                    .catch(err => reject(err))
            })
        }


        /*se retorna la funcion*/
        return {
            encuentraTodo,
            insertarRegistro,
            actualizarDatos,
            eliminarDatos
        }
    }