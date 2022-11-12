const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordenColeccion = 'ordenes';

const ordenSchema = new mongoose.Schema({
    productos: [],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

const model = mongoose.model(ordenColeccion, ordenSchema);
module.exports = model;