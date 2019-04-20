const consign = require('consign');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

consign()
    .then('config')
    .then('api/models')
    .then('api/controllers')
    .then('api/auth')
    .then('api/routes')
    .into(app);


app.listen(port, () => {
    console.log(`🌎  Go to http://localhost:${port}`);
});