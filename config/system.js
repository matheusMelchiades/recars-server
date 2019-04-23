require('dotenv').config();

module.exports = (app) => ({
    authSecret: process.env.AUTH_SECRET || '',
    timeExpirateToken: 10,
    connection: {
        database: process.env.DB_NAME || '',
        host: process.env.DB_HOST || '',
        port: process.env.DB_PORT || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || ''
    },
    integrations: {
        azure: {
            url: process.env.API_IMG_URL || '',
            key: process.env.API_IMG_KEY || ''
        }
    }
});