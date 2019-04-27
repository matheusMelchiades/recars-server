module.exports = (app) => {

    const model = app.api.models.cases;

    const getAll = async (req, res) => {
        const cases = await model.find({});

        return res.status(200).send(cases);
    };

    const create = async (req, res) => {
        try {
            const { oneCase } = req.body;
            const User = req.user;

            if (User.role === 'USER') return res.status(400).send({ message: 'Usuario nao autorizado!' });

            const result = await model.createCase({ ...oneCase, createdBy: User });

            if (!result) return res.status(400).send({ message: 'Erro Desconhecido' });

            return res.status(200).send('created successful!');
        } catch (err) {
            return res.status(400).send('Error Desconhecido');
        }
    };

    const getCasesPending = async (req, res) => {
        try {
            if (!req.user || req.user.role !== 'ADMIN') return res.status(400).send('Usuario Nao autorizado!');

            const casesPending = await model.findPending();

            if (!casesPending) return res.status(400).send('Error in search cases pending');

            return res.status(200).send(casesPending);
        } catch (err) {
            return res.status(400).send('Error Pending');
        }
    };

    const approveCase = async (req, res) => {
        try {
            const { pendencies } = req.body;

            if (!pendencies || !pendencies.length) return res.status(400).send('ERROR APPROVE CASE');

            const result = await model.ApprovePendencies(pendencies);

            if (!result) return res.status(400).send('Error in Changes');

            return res.status(200).send([]);
        } catch (err) {
            console.log(err);
            return res.status(500).send([]);
        }
    };

    return { getAll, create, getCasesPending, approveCase };
};