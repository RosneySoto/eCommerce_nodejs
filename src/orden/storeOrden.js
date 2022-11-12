const Model = require('./model');
const ModelProducto = require('../productos/model')

class ContenedorOrdenes {
    static crearOrden(username, producto){
        const timeStamp = Date.now();
        const orden = Model({
            timeStamp: timeStamp,
            productos: producto,
            username: username
        });
        console.log(`Se creo la orden ${orden}`)
        return orden.save();
    };

    static agregarProducto(idProducto){
        const nuevoProducto = ModelProducto.findById(idProducto);
        return nuevoProducto;
    }
};

module.exports = ContenedorOrdenes;