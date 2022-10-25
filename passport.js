const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const storeUsuarios = require('./componentes/usuario/storeUsuario');
const ModelUser = require('./componentes/usuario/model');

passport.use('autenticacion', new LocalStrategy((username, password, callback) => {
    const users = storeUsuarios.getUsers();
    const user = users.filter(usuario => usuario.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) return callback(new Error('Usuario no existente o password incorrecto'));
    console.log(user)
    return callback(null, user);
}));

passport.use('registracion', new LocalStrategy(async (username, password, callback) => {
    let users = await ModelUser.find();
    let user = users.find(usuario => usuario.username === username);
    console.log(user)
    if (user) {
        return callback(null, false, { message: 'No se puede registrar, el usuario ya existe' });
    }
    else if (user === undefined) {
        let passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        newUser = await storeUsuarios.addUser({username, password: passwordHash});
        return callback(null, newUser)
    }
}))

passport.use('login',new LocalStrategy(async (username, password, callback) => {
    let users = await ModelUser.find();
    let user = users.filter(usuario => usuario.username === username);
    console.log(user)
    if (!user || !password) {
        return callback(err, null, { message: 'Usuario o contraseña invalidos' });
    }
    callback(null, user);
}))

passport.serializeUser((usuario,callback) => {
    // callback(null, usuario.username)
    return callback(null, usuario)
})

passport.deserializeUser((username, callback) => {
    const user = storeUsuarios.getUsers(username)
    callback(null, user)
})

module.exports = passport;