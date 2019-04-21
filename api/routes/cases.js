module.exports = (app) => {
    const { cases } = app.api.controllers;

    app.route('/cases')
        .get(cases.getAll)
        .post(cases.create);

    app.route('/cases/pending')
        .get(cases.getCasesPending)
        .post(cases.approveCase);
};
