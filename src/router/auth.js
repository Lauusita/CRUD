const { Router } = require('express');
const Usuario = require('../models/table')
const Admin = require('../models/admin');
const bcryptjs = require('bcryptjs')
const { check } = require('express-validator');
const passport = require('passport')
const { login, postLogin } = require('../controllers/login');

const router = Router()

router.get('/', login)

router.post('/',[
    check('Nombre', 'El nombre es obvl').not().notEmpty()
    
], postLogin)

module.exports = router