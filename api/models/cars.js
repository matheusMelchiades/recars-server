const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema(
    {
        brand_id: mongoose.Types.ObjectId,
        model_id: mongoose.Types.ObjectId,
        year: Number,
        price: Number,
        fuel: {
            type: String,
            enum: ['G', 'D', 'A']
        }
    }, {
        timestamps: true,
        versionKey: false
    }
);

module.exports = (app) => mongoose.model('cars', carsSchema);