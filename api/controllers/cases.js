module.exports = (app) => {

    const model = app.api.models.cases;

    const getAll = async (req, res) => {
        const cases = await model.find({});

        return res.status(200).send(cases);
    };

    const create = async (req, res) => {
        const { oneCase } = req.body;

        const result = model.create(oneCase);

        return res.status.send(result);
    };

    return { getAll, create };
};