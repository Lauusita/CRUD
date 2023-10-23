const {Schema, model} = require('mongoose')

const datosSchema = Schema({
    
    cedula:{
        type: Number,
        maxlegth: 10,
        required:  [true, 'El apellido es obligatorio'],
        unique: true
        
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    
    apellido:{
        type: String,
        required:  [true, 'El apellido es obligatorio'],
        
        
    },
    Nacimiento:{
        type: String,
        
        
    },
    edad: {
        type: String,
        required: [true, 'La edad es obligatoria']
    },
    Telefono:{
        type: Number,
        required: [true, 'El teléfono es obligatorio'],
        min: 10
        
    },
    Direccion: {
        type: String,
        trim: true,
        required: [true, 'La dirección es obligatoria']
    },
    

},

)

module.exports = model('Usuario', datosSchema)
