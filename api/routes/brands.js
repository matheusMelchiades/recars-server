module.exports = (app) => {
    const { brands } = app.api.controllers;

    app.route('/brands')
        .get(brands.getAll)
};
