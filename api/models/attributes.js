const mongoose = require('mongoose');

const AttributesSchema = new mongoose.Schema(
    {
        search: Object,
        register: Object,
        options: Array
    },
    {
        timestamps: true,
        versionKey: false
    }
);

AttributesSchema.statics.getAllToCreate = function () {
    return new Promise((resolve, reject) => {
        this.find({}, (err, attributes) => {
            if (err) reject(err);

            const result = {};

            attributes.map((item) => {
                const toRegister = (opt) => opt.register;
                const allOptions = (a, b) => [...a, ...b];

                result[item.register.field] = item.options.map(toRegister).reduce(allOptions);
            });

            resolve(result);
        });
    });
};

AttributesSchema.statics.getAllToSearch = function () {
    return new Promise((resolve, reject) => {
        this.find({}, (err, attributes) => {
            if (err) reject(err);

            const result = {};

            attributes.map((item) => {
                const parent = (opt) => opt.search;

                result[item.search.field] = item.options.map(parent);
            });

            resolve(result);
        });
    });
};

module.exports = (app) => mongoose.model('attributes', AttributesSchema);