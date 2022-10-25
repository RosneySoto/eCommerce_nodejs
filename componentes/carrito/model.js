const mongoose = require('mongoose');

const carritosCollection = 'carritos';

const CarritosSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productos'
        }
    ]
});

const carritos = mongoose.model(carritosCollection, CarritosSchema);
module.exports = carritos;