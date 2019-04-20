const ObjectId = require('mongoose').Types.ObjectId

module.exports = (app) => {

    const model = app.api.models.models;
    const brandModel = app.api.models.brands;

    const getAll = async (req, res) => {
        const { brand, search } = req.query;

        if (brand || search) {
            const query = {
                name: {
                    '$regex': search,
                    '$options': 'i'
                }
            }

            if (brand && ObjectId.isValid(brand))
                query.brand_id = ObjectId(brand)

            const modelsByBrandId = await model.find(query)

            if (!modelsByBrandId) return res.status(400).send([])

            return res.status(200).send(modelsByBrandId);
        }

        const modelsCar = await model.find({});

        return res.status(200).send(modelsCar);
    };

    return { getAll };
};