const Model = require('./model');

class ContenedorUsuarios {

    static getUsers(){
        const ListUsuarios = Model.find();
        return ListUsuarios;
    };

    static getUserbyEmail (user){
        const usuario =  Model.findOne(user);
        return usuario;
    };

    static addUser(usuario){
        const newUser = Model({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            telefono: usuario.telefono,
            username: usuario.username,
            password: usuario.password
        });
        return newUser.save();
    };
};

module.exports = ContenedorUsuarios;