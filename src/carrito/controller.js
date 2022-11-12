const ContenedorCarritos = require('./model');
const storeCarrito = require('./storeCarritos');

const crearCarrito = async (req, res) => {
     const carritoNuevo = req.body;
     const carrito = await storeCarrito.crearCarrito(carritoNuevo);
     res.send(carrito);
};

module.exports = {
    crearCarrito,
}