module.exports = (app) => {
    const { cases } = app.api.controllers;

    app.route('/cases')
        .get(cases.getAll)
        .post(cases.create);
};
