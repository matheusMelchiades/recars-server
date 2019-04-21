const ObjectId = require('mongoose').Types.ObjectId
module.exports = (app) => {

    const model = app.api.models.cases;

    const getAll = async (req, res) => {
        const cases = await model.find({});

        return res.status(200).send(cases);
    };

    const create = async (req, res) => {
        const { oneCase } = req.body;

        const result = model.create(oneCase);

        return res.status(200).send(result);
    };

    const getCasesPending = async (req, res) => {
        try {
            console.log(req.user)
            if (!req.user || req.user.role !== 'ADMIN') return res.status(400).send('User not Authenticate')

            const casesPending = await model.find({ status: 'PENDING' })

            if (!casesPending) return res.status(400).send('Error in search cases pending')

            return res.status(200).send(casesPending)
        } catch (err) {
            return res.status(400).send('Error Pending')
        }
    };

    const approveCase = async (req, res) => {
        try {
            const { pendencies } = req.body

            if (!pendencies || !pendencies.length) return res.status(400).send('ERROR APPROVE CASE')

            const query = {
                '_id': {
                    '$in': pendencies.map((casePend) => ObjectId(casePend._id))
                }
            }

            const result = await model.updateMany(query, {
                '$set': { status: 'APPROVE' }
            }, { upsert: true })

            if (!result) return res.status(400).send('Error in Changes')

            return res.status(200).send([])
        } catch (err) {
            console.log(err)

            return res.status(500).send([])
        }
    }

    return { getAll, create, getCasesPending, approveCase };
};