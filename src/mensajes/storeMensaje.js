const Model = require('./model');
const posts = require('./model');
const norm = require('normalizr');
const print = require('../../utils/print')

class ContenedorMensaje {
    mock = [];

    static getMessages(){
        const ListaMensajes = Model.find();
        return ListaMensajes;    
    };

    static getMessageByMsj(email){
        const chatRecibido = Model.findOne(email);
        return chatRecibido;
    };

    static crearMensaje(mensaje) {
        const mensajeNuevo = Model({
            author: {
                nombre: mensaje.nombre,
                apellido: mensaje.apellido,
                edad: mensaje.edad,
                email: mensaje.email,
                alias: mensaje.alias,
                avatar: mensaje.avatar,
                text: mensaje.text
            },
        });
        console.log(mensajeNuevo);
        return mensajeNuevo.save();
    };

    async normalizer() {
        const mensajesDB = {
            id: 'mensajes',
            messages : posts
        };

        const esquemaAuthor = new norm.schema.Entity('authors', {}, {idAttribute: 'email'});
        const esquemaMensaje = new norm.schema.Entity('message', { 
            author: esquemaAuthor
        });
        const esquemaMensajes = new norm.schema.Entity('messages', {
            texts: [ esquemaMensaje ]
        });
        const normalizerMensajes = norm.normalize(mensajesDB, esquemaMensajes);
        print(normalizerMensajes);
        return normalizerMensajes;
    };
};

module.exports = ContenedorMensaje;