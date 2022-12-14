const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');

const { productos, crearProducto, eliminarProducto, buscarProductoDescripcion, editarProducto, mostrarProductos } = require('../src/productos/controller');
const { inicio, registroUsuario, listarUsuarios, usuarioLogin, registroVista, usuarioEmail, registroView, usuarioById } = require('../src/usuario/controller');
const { listaMensajes, postMessage, listaMensajePorEmail } = require('../src/mensajes/controller');
const { agregarProducto } = require('../src/orden/controller');
const { crearCarrito } = require('../src/carrito/controller');
const { generarJwt, tokenValido,  } = require('../middleware/auth'); 

// ROUTERS DEL MODULO USUARIO
router.get('/', inicio);
router.get('/home', tokenValido, productos)
router.post('/', generarJwt, passport.authenticate('autenticacion', {
    successRedirect: '/home',
    failureRedirect: '/',
    passReqToCallback: true
}), usuarioLogin);
router.get('/signIn', registroView);
router.post('/signIn', registroUsuario)
router.get('/:username', usuarioEmail);
router.get('/usuario/:id', usuarioById);
router.get('/usuarios', listarUsuarios)

// // ROUTERS DEL MODULO PRODUCTO
router.get('/productos', mostrarProductos);
router.post('/productos', crearProducto);
// router.delete('/productos/:id', eliminarProducto);

// router.get('/producto/:descripcion', buscarProductoDescripcion);
// router.patch('/producto/:id', editarProducto);

// //ROUTERS DEL MODULO MENSAJE
// router.get('/mensajes', listaMensajes);
// router.get('/chat/:email', listaMensajePorEmail);
// router.post('/chat', postMessage);


// //ROUTERS DEL CARRITO
// router.post('/carrito/:idProducto', agregarProducto)
// router.post('/carrito', crearCarrito)

module.exports = router;