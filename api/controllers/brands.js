module.exports = (app) => {

    const model = app.api.models.brands;

    const getAll = async (req, res) => {
        try {
            const { search } = req.query

            if (search) {
                const brandsBySearch = await model.find({ name: { '$regex': search, '$options': 'i' } })

                return res.status(200).send(brandsBySearch)
            }

            const brands = await model.find({});

            return res.status(200).send(brands);
        } catch (err) {
            console.log(err)
            return res.status(400).send([])
        }
    };

    return { getAll };
};