const mongoose = require('mongoose');

const productoCollection = 'productos';

const ProductosSchema = new mongoose.Schema({
    descripcion: {
        type: String,
    },
    precio: {
        type: Number,
    },
    categoria: {
        type: String
    },
    fotoProd: {
        type: String,
    }
});

const productos = mongoose.model(productoCollection, ProductosSchema);
module.exports = productos;