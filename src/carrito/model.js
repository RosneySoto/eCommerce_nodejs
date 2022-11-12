const mongoose = require('mongoose');

const carritosCollection = 'carritos';

const CarritosSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    products: [],
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const carritos = mongoose.model(carritosCollection, CarritosSchema);
module.exports = carritos;