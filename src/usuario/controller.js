const config = require('../../config');
const storeUsuario = require('./storeUsuario');
const { MongoClient } = require('mongodb');
const transport = require('../../middleware/nodemailer')
const bcrypt = require('bcrypt');
const Model = require('./model');
const session = require('express-session');

const inicio = (req, res) => {
    res.render('logIn');
};

const registroView = (req, res) => {
    res.render('signIn');
}

const usuarioLogin = async (req, res) => {
    const user = req.body
    if(!user) return console.log('DEBE INGRESAR UN EMAIL COMO USUARIO')
    const usuario = await storeUsuario.loginUser(user);
    if(!usuario) {
        return console.log('EL USUARIO NO EXISTE')
    }
    req.session.usuario = usuario;
    if(req.session.carrito == undefined){
        req.session.carrito = [];
    };
    // res.send('el usuario ingreso correctamente');
    res.render("home");
};

const usuarioEmail = async (req, res) => {
    const usuario = req.params.username
    const user = await storeUsuario.getUserbyEmail(usuario);
    res.send(user)
};

const usuarioById = async (req, res) => {
    const usuarioId = req.params.id;
    const user = await storeUsuario.getUserById(usuarioId);
    console.log(user)
    res.send(user);
};

const listarUsuarios = async (req, res) => {
    const usuarios = await storeUsuario.getUsers();
    res.send(usuarios);
};

const registroUsuario = async (req, res, callback) =>{
    const user = req.body
    const userFind = await Model.findOne({username: req.body.username}) 
    if(userFind){
        console.log('ERROR: EL USUARIO YA EXISTE')
        res.send('ERROR, EL USUARIO YA EXISTE')
    }
    const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        const newUser = { 
            username: req.body.username, 
            password: passwordHash,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
          };
        savedUser = await storeUsuario.addUser(newUser);
        res.render('home');
};

module.exports = {
    inicio,
    usuarioLogin,
    registroView,
    usuarioEmail,
    registroUsuario,
    listarUsuarios,
    usuarioById,
};