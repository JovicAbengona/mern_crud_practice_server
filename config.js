// Database Configuration
const MySQL      = require("mysql2");
const Connection = MySQL.createConnection({
    "host": 'localhost',
    "user": 'root',
    "password": '',
    "database": 'mern_crud_db',
    "port": 3306
});

module.exports = Connection.promise();