module.exports = (app) => {
    const { models } = app.api.controllers;

    app.route('/models')
        .get(models.getAll)
}