// const nodemailer = require('nodemailer');

// const transport = nodemailer.createTransport({
//     service: 'gmail',
//     port: 587,
//     auth: {
//         user: 'rosney.soto@gmail.com',
//         pass: 'bpngftzfddacvejm'
//     },
//     tls: {
//       rejectUnauthorized: false
//     }
// })

// transport.sendMail({
//     from: 'Jose <jose@gcoder.com>',
//     to: 'rosney.soto@gmail.com',
//     html: '<h1>Usuario creado correctamente</h1>',
//     subject: 'REGISTRO A TIENDA ECOMMERCE',
// }).then((result) =>{
//     console.log(result)
// }).catch(console.log);

// module.exports = {
//     transport
// }