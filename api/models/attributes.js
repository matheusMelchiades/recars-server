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
                const childrens = (opt) => opt.childrens;
                const allOptions = (a, b) => [...a, ...b];

                result[item.register.field] = item.options.map(childrens).reduce(allOptions);
            });

            resolve(result);
        });
    });
};

module.exports = (app) => mongoose.model('attributes', AttributesSchema);