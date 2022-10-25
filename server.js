const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const router = require('./routes/routes');
const db = require('./DB/mongodb');
const Model = require('./componentes/mensajes/model');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const { MongoClient } = require('mongodb');
const passport = require('./passport');
const config = require('./config')
const cluster = require('cluster');
const numCPUs = require('os');
const minimist = require('minimist');
const compression = require('compression');
const storeProductos = require('./componentes/productos/storeProducto');
const storeMensaje = require('./componentes/mensajes/storeMensaje')

const app = express();

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.dbUrlMongo
    }),
    secret: 'jose',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      defaultLayout: 'index.hbs',
      layoutsDir: __dirname + '/public/views/layouts',
    })
);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', './public/views/layouts');
app.set('view engine', 'hbs');

const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

socketServer.on('connection',async (socket) => {
    socket.emit('messages',await storeMensaje.getMessages())
    socket.emit('products',await storeProductos.getAll())

    socket.on('new_message',async (mensaje) => {
        saveMessage(mensaje);
        let mensajes = await storeMensaje.getMessages();
        socketServer.sockets.emit('messages',mensajes);
    });

    socket.on('new_products',async (product) => {
        await save(product)
        let productos = await storeProductos.getAll() === '' ? '' : await storeProductos.getAll();
        socketServer.sockets.emit('products',productos);
    });
});

app.use('/', router);
db(config.dbUrlMongo);

const args = minimist(process.argv.slice(2), { alias: { 'p': 'port' }, default: { 'port': 8080, 'modo': 'FORK' } })

const numeroCpus = numCPUs.cpus().length;
const processId = process.pid;
const isMaster = cluster.isMaster;

const PORT = args.port
console.log(`Proceso ${processId} - isMaster: ${isMaster}`)
if (args.modo == 'CLUSTER') {
    if (cluster.isMaster) {
        for (let i = 0; i < numeroCpus; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker) => {
            console.log(`Proceso worker con PID ${worker.process.pid} salio`);
        });
    } else {
        httpServer.listen(PORT, () => {});
        httpServer.on("error", (error) => console.error(error, "error de conexión"));
    };
};

if (args.modo == 'FORK'){
    httpServer.listen(PORT, (error) => {
        if(error){
            console.log('Hubo un error en la conexion del servidor');
            process.exit();
        } else {
            console.log(`Escuchando en el puerto ${httpServer.address().port}`);
        };
    });
};

module.exports = socketServer;