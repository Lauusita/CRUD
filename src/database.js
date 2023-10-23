require('dotenv').config()
const mongoose = require('mongoose')

const dbConnection = async()=>{
    try {

        await mongoose.connect('mongodb+srv://laura_manolo:Sof1tete@registromanolo.9xu303a.mongodb.net/', {

            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        console.log(`Se ha conectado a la base de datos`)
    }
    

    catch (error) {
    throw new Error(`No se ha podido acceder a la base de datos`)
}}

module.exports={dbConnection}