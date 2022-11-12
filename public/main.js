const socket = io();

//PRODUCTO
const enviarProducto = () => {
    const producto = document.getElementById("producto").value;
    const precio = document.getElementById("precio").value;
    const fotoProd = document.getElementById("fotoProd").value;
    const categoria = document.getElementById("categoria").value;
    
    const product = {producto, precio, fotoProd, categoria};
    
    producto = '';
    precio = '';
    fotoProd = '';
    categoria = '';
    
    socket.emit('new_products', product);
    
    return false;
};

const crearProducto = (product) =>{
    const {producto, precio, fotoProd, categoria} = product;
    return `
        <tr>
            <td headers="producto">${producto}</td>
            <td headers="precio">${precio}</td>
            <td headers="fotoProd">
                <img src="${fotoProd}" alt="" width="75" height="75"></img>
            </td>
            <td headers="categoria">${categoria}</td>
        </tr>
    `
};

const agregarProductos = (products) =>{
    const productFinal = products.map(product => crearProducto(product)).join(" ");
    document.getElementById('products').innerHTML = productFinal;
};

socket.on('products', (products)=>{
    return agregarProductos(products)
});

MENSAJES
const enviarMensaje = () => {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const alias = document.getElementById('alias').value;
    const avatar = document.getElementById('avatar').value;
    const email = document.getElementById('email').value;
    const text = document.getElementById('txt').value;
    const fyh = String(new Date().toDateString() + ' ' + new Date().toLocaleTimeString())
    const mensaje = {
        author:{
            nombre, apellido, edad, alias, avatar, email,
        },
        text,
        fyh
        };
    socket.emit('new_message', mensaje);
    return false;
}

const crearEtiquetasMensaje = (mensaje) => {
    const { fyh, author, text } = mensaje;
    return `
    <div>
        <p style='color:brown'>${fyh}</p>
        <strong style='color:blue'>${author.email}</strong>
        <i style='color:green'>${text}</i>
        <i><img src="${author.avatar}" height="50rem"></i>
    </div>
    `;
}

const agregarMensajes = (mensajes) => {
    if (mensajes !== '') {
        const mensajesFinal = mensajes.map(mensaje => crearEtiquetasMensaje(mensaje)).join(' ');
        document.getElementById('messages').innerHTML = mensajesFinal;
    }
}

socket.on('messages',(messages) => agregarMensajes(messages));

socket.on('usuario', (usuario) => {
    if(usuario != false){
        document.getElementsByTagName('h1')[0].innerHTML = `Bienvenido ${JSON.stringify(usuario.username)} <br>
        <input type="button" value="Cerrar Sesion" id='logout'>`;
        document.getElementById('logout').addEventListener('click', () => {
            window.location.assign('/logOut');
        })
    } else {
        window.location.assign('/logOut');
    };
});

setInterval(() => {
    socket.emit('nuevo_usuario', async () => {})
}, 500000)