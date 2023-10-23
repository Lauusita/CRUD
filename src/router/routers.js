const { Router } = require('express');
const Usuario = require('../models/table')
const Admin = require('../models/admin');
const bcryptjs = require('bcryptjs')
const { check } = require('express-validator');
const passport = require('passport')

const { 
    
    getRegistro,
    getTable,
    getUpdate
}= require('../controllers/page')

const router = Router();

// MANEJO SOLICITUDES GET


router.get('/registro', getRegistro);

router.get('/table', getTable );

router.get('/edit/:id', getUpdate);



router.post('/add', async(req, res) => {
    
    const {cedula, nombre, apellido, Nacimiento, Telefono, Direccion, edad} = req.body
    const usuario = new Usuario({cedula, nombre, apellido, Nacimiento, Telefono, Direccion, edad} )

    const existeCedula = await Usuario.findOne({ cedula })
    const existeTel = await Usuario.findOne({ Telefono })
    if (existeCedula){
        return res.status(404).render('../views/error/notCedula.hbs')
    }else if (existeTel){
        return res.status(404).render('../views/error/notTel.hbs')
    }

    console.log({cedula, nombre, apellido, Nacimiento, Telefono, Direccion, edad} )
    
    await usuario.save();
    
    res.redirect('/enter/registro');
});




router.post('/edit/:id', async(req, res) => {
    
    try {
        console.log(req.params)
        console.log(req.body)
        const {id}= req.params

        await Usuario.findByIdAndUpdate(id, req.body).lean()
        res.redirect('/enter/table')
        
    } catch (error) {
        return res.status(404).json({
            msg: 'ayuda'
        })
    }
    
});

router.get('/delete/:id', async(req, res) => {

    const {id}= req.params
    
    
    await Usuario.findByIdAndDelete(id)
    
    res.redirect('/enter/table')
    
});



module.exports = router;