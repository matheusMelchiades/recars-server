const { azure } = require('../services/APIs')

module.exports = (app) => {
    const { url, key } = app.config.system.integrations.azure;
    const API = azure(url, key);

    searchImages = async (search) => {
        try {
            const response = await API.get(`?q=${search}carro&count=15`)

            if (response.status !== 200) return []

            return response.data
        } catch (err) {
            console.log('Error azure integration')
        }
    };

    return { searchImages }
}