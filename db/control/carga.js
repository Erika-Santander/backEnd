'use strict'
module.exports = function setupCarga(cargaModel) {

    async function agregarDatos(model) {
        return new Promise(async (resolve, reject) => {
            cargaModel.create(model)
                .then(resultado => resolve(resultado))
                .catch(err => reject(err))
        })
    }

    return {
        agregarDatos,
    }
}
