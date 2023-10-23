const {Schema, model}= require('mongoose')

const adminSchema = Schema({

    Nombre: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    }
})

module.exports = model('Admin', adminSchema)