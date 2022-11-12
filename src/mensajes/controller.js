const config = require('../../config');
const { MongoClient } = require('mongodb');
const storeMensaje = require('./storeMensaje');
const storeProducto = require('../productos/storeProducto');

const listaMensajes = async (req, res) =>{
    const mensajes = await storeMensaje.getMessages();
    res.send({mensajes});
};

const listaMensajePorEmail = async (req, res) => {
    const nuevo = req.params.email
    const mensajes = await storeMensaje.getMessageByMsj(nuevo);
    // res.send({mensajes});
    res.render('messages');
};

const postMessage = async (req, res) => {
    let userName = req.body;
    console.log(userName);
    const mensjaeNuevo = await storeMensaje.crearMensaje(userName);
    res.send(`Mensaje creado correctamente`);

    if(!userName) console.log('No se ingreso el nombre del usuario')
    req.session.request = req.session.request == null ? 1 : req.session.request + 1;
    const mongo = new MongoClient(config.dbUrlMongo);
    await mongo.connect();
    let conectionMongo = mongo
    // logger.info('El usuario ingreso correctamente a la aplicacion')
    res.render('messages');
    
    const socketServer = require('../../server');

    socketServer.on('connection',async (socket) => {

        socket.emit('usuario', userName);
        socket.emit('messages',await storeMensaje.getMessages());
        socket.emit('products',await storeProducto.getAll());

        socket.on('nuevo_usuario', async (user) => {
            let sesion = await conectionMongo.db('ecommerce').collection('session').find().toArray();
            let usuario = sesion[sesion.length - 1];
            if(usuario === undefined){
                console.log('Sesion finalizada');
                socket.emit('usuario', false)
            } else {
                socket.emit('usuario', userName)
            };
        });
    });
};

module.exports = {
    postMessage,
    listaMensajes,
    listaMensajePorEmail
}