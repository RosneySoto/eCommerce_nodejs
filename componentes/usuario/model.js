const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config  = require('../../config');

const UsuariColeccion = 'usuarios';

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        // require: true
    },
    apellido:{
        type: String,
        // require:true
    },
    telefono:{
        type: Number,
        // require: true
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    // tokens: [{
    //     token: {
    //         String,
    //         require: true
    //     },
    //     date: {
    //         type: Date,
    //         default: Date.now
    //     }
    // }]
});

// UsuarioSchema.pre('save', async function (next) {
//     const user = this
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8);
//     }
//     next();
// });

// UsuarioSchema.methods.generateAuthToken = async function() {
//     // Generate an auth token for the user
//     const user = this;
//     const token = jwt.sign({_id: user._id}, config.JWT_KEY);
//     user.tokens = user.tokens.concat({token});
//     await user.save();
//     return token
// }

// UsuarioSchema.statics.findByCredentials = async (username, password) => {
//     // Search for a user by email and password.
//     if (!validator.isEmail(username)) {
//         throw new Error({ error: 'Invalid login credentials' });
//     }
//     const user = await User.findOne({ username, active:true} )
//         .select("-__v");

//     if (!user) {
//         throw new Error({ error: 'Invalid login credentials' });
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//         throw new Error({ error: 'Invalid login credentials' });
//     }
//     return user;
// }

const model = mongoose.model(UsuariColeccion, UsuarioSchema);
module.exports = model;