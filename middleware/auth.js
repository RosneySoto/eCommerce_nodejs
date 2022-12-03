require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// const generarJwt = (playload) => jwt.sign(playload, JWT_SECRET, {expiresIn: '1h'});

const generarJwt = (data) => {
    const token = jwt.sign({data: data.username, data: data._id}, JWT_SECRET, {expiresIn: '1h'});
    console.log(`EL TOKEN ES ${token}`)
    return token;
};


const verificarJwt = (token) => jwt.verify(token, JWT_SECRET, (err, data) => {
    if (err) throw new Error('Token invalido');
    return contenido;
});

const tokenValido = (req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    // const tokerJSON = JSON.stringify
    try {
        jwt.verificarJwt(token);
        next()
    } catch (error) {
        next(error)
    };
};

module.exports = {
    generarJwt,
    verificarJwt,
    tokenValido
}