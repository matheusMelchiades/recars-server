const mongoose = require('mongoose')

const AttributesSchema = new mongoose.Schema(
    {
        parent: {

        },
        children: {

        },
        options: {

        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = (app) => mongoose.model('attributes', AttributesSchema)