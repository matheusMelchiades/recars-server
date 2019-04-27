const mongoose = require('mongoose');
const config = require('./system')().connection;

module.exports = mongoose.connect(`mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`, {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err, connect) => !err ? console.log('Connect database') : console.log('Error connect database'));