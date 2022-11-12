const Model = require('./model');

class ContenedorUsuarios {

    static loginUser(usuario){
        const user = Model.findOne({username: username});
        if(!user) {
            console.log('ERROR, EL USUARIO NO EXISTE');
        }else{
            return user;
        };
    };

    static getUsers(){
        const ListUsuarios = Model.find();
        return ListUsuarios;
    };

    static getUserbyEmail (username){
        const listUser = Model.find();
        const usuario = listUser.findOne({username: username})
        // const usuario =  Model.findOne(user);
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