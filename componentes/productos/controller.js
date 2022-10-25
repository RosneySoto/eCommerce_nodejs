const storeProducto = require('./storeProducto');

const productos = async (req, res) =>{
    const productos = await storeProducto.getAll();
    // res.render("productos");
    res.send({productos});
};

const crearProducto = async (req, res) => {
    const producto = req.body
    const nuevoProducto = await storeProducto.crearProducto(producto);
    res.send(`Se guardo el siguiente producto ${nuevoProducto}`)
};

const buscarProductoDescripcion = async (req, res) => {
    const producto = req.params.descripcion;
    try {
        await storeProducto.buscarProductoDescripcion(producto)
    } catch (error) {
        console.log(error)
    }
    res.send({producto})
}

const eliminarProducto = async (req, res) =>{
    const id = req.params.id
    try {
        await storeProducto.deleteProduct(id)
    } catch (error) {
        console.log(error)
    }
    res.send(`Producto Eliminado correctamente`)
}

const editarProducto = async (req, res) =>{
    const id = req.params.id;
    const producto = req.body;
    // console.log(id)
    console.log(producto)
    try {
        storeProducto.editarProducto(id, producto)
    } catch (error) {
        console.log(error)
    }
    res.send(`Se modifico el producto con ID ${id}`)
}


module.exports = {
    productos,
    crearProducto,
    buscarProductoDescripcion,
    eliminarProducto,
    editarProducto
}
