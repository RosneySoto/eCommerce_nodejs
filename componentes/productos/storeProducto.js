const Model = require('./model');

class ContenedorProducto {

    static addProduct(producto){
        const newProduct = Model(producto);
        return newProduct.save();
    };
    
    static getAll(){
        const productos = Model.find();
        return productos;
    };
    
    static buscarProductoDescripcion (descripcion) {
        const producto = Model.findOne({descripcion});
        return producto;
    };
    
    static deleteProduct(id){
        const producto = Model.findByIdAndDelete({_id: id})
        return producto;
    };
    
    static crearProducto(producto){
        const newProduct = Model({
            descripcion: producto.descripcion,
            precio: producto.precio,
            categoria: producto.categoria,
            fotoProd: producto.fotoProd
        })
        return newProduct.save();
    };
    
    static editarProducto(id, producto){
        const product = Model.findByIdAndUpdate(id);
        $set:{
            producto: product.producto
            precio: product.precio
            categoria: product.categoria
            fotoProd: product.fotoProd
        }
        return product;
    };
    
};

module.exports = ContenedorProducto;