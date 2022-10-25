const minimist = require('minimist');
const dotenv = require('dotenv');
dotenv.config()

const config = {
    dbUrlMongo: process.env.MONGO_DB_URL,
    MySQLhost: process.env.MYSQL_HOST,
    MySQLuser: process.env.MYSQL_USER,
    MySQLpassword: process.env.MYSQL_PASSWORD,
    MySQLdb: process.env.MYSQL_DB,
    // port: process.env.PORT || Number(process.env[2]) || 8080,
    // port: process.env.PORT || Number(process.env[2]),
};

module.exports = config;