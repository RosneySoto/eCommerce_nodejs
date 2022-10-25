const config = require('../../config');
const storeUsuario = require('./storeUsuario');
const { MongoClient } = require('mongodb');
const transport = require('../../middleware/nodemailer')

const inicio = (req, res) => {
    // res.send('vista login formulario')
    res.render('logIn');
};

const listarUsuarios = async (req, res) => {
    const usuarios = await storeUsuario.getUsers();
    res.send({usuarios});
};

const usuarioLogin = async (req, res) => {
    const usuario = req.body;
    const usuarioLogeado = await storeUsuario.getUserbyEmail(usuario);
    res.send(`Bienvenido ${usuarioLogeado}`)
    // res.render("productos");
};

const registroVista = (req, res) => {
    res.render("signIn")
}

const registroUsuario = async (req, res) =>{
    const usuario = req.body;
    const nuevoUsuario = await storeUsuario.addUser(usuario);
    res.send("Usuario creado correctamente");
    // res.render('productos');
};

module.exports = {
    inicio,
    registroUsuario,
    listarUsuarios,
    usuarioLogin,
    registroVista
};