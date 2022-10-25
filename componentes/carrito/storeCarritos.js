const { assign } = require('nodemailer/lib/shared');
const {modelCarrito} = require('./model');

let ID = '_id';

class ContenedorCarritos {

    static crearCarrito () {
        try {
            return modelCarrito.create({});
        } catch (error) {
            console.log('ERROR AL CREAR CARRITO' + error)
        }
    }

    static deleteCarritoById(id){
        try {
            return modelCarrito.findByIdAndDelete({[this.ID]: id});
        } catch (error) {
            console.log('ERROR AL BORRAR EL CARRITO' + error)
            return false
        };
    };

    static saveProductToCart(id, obj){
        try {
            const cart = modelCarrito.findById(id);
            cart.productos.push(obj.productoId);
            cart.save();
            return true;
        } catch (error) {
            console.log('ERROR AL GUARDAR EL PRODUCTO EN EL CARRITO' + error)
            return false
        }
    }

    static deleteProductFromCart(id, productId) {
        try {
            const cart =  modelCarrito.findById(id);
            cart.productos.remove(productId);
            cart.save();
            return true;
        } catch (error) {
            console.log('ERROR AL BORRAR PRODUCTO DEL CARRITO' + error);
            return false;
        }
    }
    
    static getAllProductsFromCart(id) {
        try {
            return modelCarrito.findById(id).populate('productos').select({products: 1, _id:0});
        } catch (error) {
            console.log('ERROR AL LISTAR LOS PRODUCTOS DEL CARRITO' + error);
            return false;
        }
    }
}

module.exports = ContenedorCarritos;