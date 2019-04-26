module.exports = (app) => {

    const models = app.api.models;

    const find = async (req, res) => {
        try {
            const search = await models.searchs.create({ ...req.body, user: { ...req.user } });
            const cases = await models.cases.find({}).limit(10);

            if (!search) return res.status(400).send('ERROR');
            if (!cases) return res.status(400).send('ERROR');

            return res.status(200).send(cases);
        } catch (err) {
            console.log(err);
            return res.status(400).send('ERROR');
        }
    };

    return { find };
};