
const {request, response}= require('express')
const Admin = require('../models/admin')
const bcryptjs = require('bcryptjs')
const {generarJWT} = require('../helpers/generarJWT')


const login = async(req = request, res = response)=>{
    
    res.render('login.hbs')

    
}

const postLogin = async(req = request, res = response)=>{
    const {Nombre, Password}= req.body;
    console.log(Nombre, Password)
    
    try {
        // $2a$10$IDva27b//o9NiZxYU81UBe3RKuV55F7Z9IU26WtWRwfKKzgxooMaq

        // verificar si el nombre existe
        
        const admin = await Admin.findOne({Nombre})
        console.log(admin)
        if (!admin){
            return res.render('../views/partials/login.hbs')
        }
        
        

        // verificar contraseña

        const validPassword = bcryptjs.compareSync( Password, admin.Password) // No funcionó y no entiendo por qué si los valores son los mismos.
        console.log(validPassword)
        console.log(Password)
        console.log(admin.Password)

        const token = await generarJWT( admin.id);
        console.log(token)
        
        if ( Password === await admin.Password ){
            return res.redirect('/enter/registro')
            
        }else{
            res.render('../views/partials/login.hbs')
        }

        // generar JWT
    
        

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'algo salió mal'
        })
    }
}


module.exports={
    login,
    postLogin
}