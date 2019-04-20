const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

module.exports = (app) => {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors({ origin: '*' }));
};