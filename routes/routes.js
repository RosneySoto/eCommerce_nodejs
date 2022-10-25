const express = require('express');
const router = express.Router();
const passport = require('../passport');

const { productos, crearProducto, eliminarProducto, buscarProductoDescripcion, editarProducto } = require('../componentes/productos/controller');
const { inicio, registroUsuario, listarUsuarios, usuarioLogin, registroVista } = require('../componentes/usuario/controller');
const { listaMensajes, postMessage, listaMensajePorEmail } = require('../componentes/mensajes/controller');


// ROUTERS DEL MODULO USUARIO
router.get('/', inicio);
router.post('/', passport.authenticate('login', {
    failureReddirect: '/', failureMessage: true,
    successRedirect: '/productos'
}), passport.authenticate('autenticacion',{
    failureReddirect: '/', failureMessage: true,
    successRedirect: '/productos'
}), usuarioLogin)

router.get('/users', listarUsuarios)
router.get('/signIn', registroVista)
router.post('/signIn', /*passport.authenticate('registracion',{ failureRedirect: '/',failureMessage: true }),*/ registroUsuario)

// ROUTERS DEL MODULO PRODUCTO
router.get('/productos', productos);
router.get('/producto/:descripcion', buscarProductoDescripcion);
router.post('/producto', crearProducto);
router.delete('/productos/:id', eliminarProducto);
router.patch('/producto/:id', editarProducto);

//ROUTERS DEL MODULO MENSAJE
router.get('/mensajes', listaMensajes);
router.get('/chat/:email', listaMensajePorEmail);
router.post('/chat', postMessage);


module.exports = router;