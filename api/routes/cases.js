module.exports = (app) => {
    const { authenticate } = app.api.auth.authenticate;
    const { cases } = app.api.controllers;

    app.route('/cases')
        .get(cases.getAll)
        .all(authenticate())
        .post(cases.create);

    app.route('/cases/pending')
        .all(authenticate())
        .get(cases.getCasesPending)
        .post(cases.approveCase);
};
