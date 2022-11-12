const Model = require('./model');

const storeOrden = require('./storeOrden');

const agregarProducto = async (req, res) => {
    const productoId = req.boy
    const producto = await storeOrden.agregarProducto(productoId);
    res.send(producto)
};

module.exports = {
    agregarProducto,
}