
const { Router } = require('express');
const Usuario = require('../models/table')


const {response, request} = require('express')


const getRegistro = (req = request, res = response) => {
    res.render('index.hbs')
    
}

const getTable = async(req = request, res = response)=>{
    
    const table = await Usuario.find().lean()// lo que hace el lean es que le dice la instancia que no devuelva el objeto como un objeto de MongoDB sino como un objeto de Javascript

     //console.log(table[0]) imprime en consola el objeto en la posición uno, el cual es el primer objeto que viene de MongoDB
    
    res.render('table.hbs', {table})
}

const getUpdate = async(req = request, res = response )=>{

    try {
        const consulta = await Usuario.findById(req.params.id).lean()
        console.log(consulta.edad)
        res.render('edit.hbs', {consulta} )
    } catch (error) {
        return res.status(404).redirect('/notfound')
    } 

    
    
}

const getDelete = async(req, res) => {

    const {id}= req.params
    
    
    await Usuario.findByIdAndDelete(id)
    
    res.redirect('/enter/table')
    
}

module.exports = {
    
    getRegistro,
    getTable,
    getUpdate,
    getDelete
}