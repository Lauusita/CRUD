require('dotenv').config() // se importa dotenv y se coloca .config() para aceptar la configuración por defecto de la librería
const express = require('express')
const path = require('path') // el path, el cual viene interamente, se utilizará para facilitar el acceso a rutas directamente desde el directorio de cual sea el ordenador
const morgan = require('morgan') // se importa morgan con el objetivo de saber las peticiones que hace el usuario a través de la web
const {engine} = require('express-handlebars') // se importa la función engine para configurar handlebars
const {dbConnection}= require('./database')
const methodOverride =require('method-override')

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.user = "/enter"
        this.auth = "/login"

        // base de datos
        this.database()
        // settings
        this.settings()
        // middlewares
        this.middlewares()
        // routes
        this.routes()
        // engin
    
    }

    async database(){
        await dbConnection()
    }

    settings(){
        this.app.set('port', process.env.PORT || 8080)
        this.app.set('views', path.join(__dirname, 'views')); // se implementa el path join para que recorra toda la ruta hasta donde se encuentre la carpeta views, concatenando los directorios 
        

        this.app.engine( // se configura handlebars como principal motor de plantilla
            ".hbs", engine(
                {
                    layoutsDir: path.join(__dirname, 'views/layouts'), // se especifica en dónde se encuentra la carpeta principal concatenando su dirección más 'views/layouts'
                    defaultLayout: 'main', // se establece la interfaz principal, la cual se encuentra en la carpeta layout
                    extname: '.hbs', // forma verdadera de mostrarle al módulo que este será la manera en la que aparecerá
                }
            )
            );
        this.app.set("view engine", ".hbs");
        
        
        
    }
    middlewares(){

        this.app.use(morgan('dev')) // básicamente me da a saber el estado de petición a través de la consola
        
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:false}))
        this.app.use(methodOverride('_method'))

    }
    routes(){

        this.app.use(this.user, require('../src/router/routers'))

        this.app.use(this.auth, require('../src/router/auth'))

        this.app.use('*',(req, res)=>{

            res.status(404).render('notfound.hbs')})
    }


    listen(){
        this.app.listen(this.app.get('port'), ()=>{
            console.log(`Listening at ${this.app.get('port')}` )
        })
        
    }
    
}

module.exports = Server