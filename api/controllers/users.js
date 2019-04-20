const { authSecret, timeExpirateToken } = require('../../config/system');
const jwt = require('jwt-simple');
const encryption = require('../../helper/encryption');
const time = require('../../helper/time');

module.exports = (app) => {
    const model = app.api.models.users;

    const getAll = async (req, res) => {
        const users = await model.find({}, { _id: 1, username: 1 });

        return res.status(200).send(users);
    };

    const signup = async (req, res) => {
        try {
            const { username, password } = req.body;

            //CHECK PARAMS
            if (!username || !password) return res.status(400).send('Incomplete Data!');

            //CHECK ALREADY EXISTS USERSNAME
            const usersDb = await model.findOne({ username: username })

            if (usersDb) return res.status(400).send('Username Alredy registred!')

            let passEncrypted = await encryption.encrypt(password);

            const user = await model.create({ username, password: passEncrypted });

            if (user)
                return res.status(200).send('Created with success!');
        } catch (err) {
            return res.status(500).send(err);
        }
    };

    const signin = async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) return res.status(400).send('Incomplete Data!');

            const user = await model.findOne({ username });

            if (user) {
                let checkPass = await encryption.check(password, user.password);

                if (!checkPass) return res.status(500).send('Username or password invalid');

                return res.status(200).send({
                    username: user.username,
                    token: jwt.encode({
                        _id: user._id,
                        expirate: time.addMinutes(new Date(), timeExpirateToken)
                    }, authSecret)
                });

            } else
                return res.status(400).send('User not found');
        } catch (err) {
            return res.status(409).send('Error');
        };
    };

    return { getAll, signup, signin };
};