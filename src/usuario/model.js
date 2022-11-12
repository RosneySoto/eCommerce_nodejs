const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuariColeccion = 'usuarios';

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        // require: true
    },
    apellido:{
        type: String,
        // require:true
    },
    telefono:{
        type: Number,
        // require: true
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
});

const model = mongoose.model(UsuariColeccion, UsuarioSchema);
module.exports = model;