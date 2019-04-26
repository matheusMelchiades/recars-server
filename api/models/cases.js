const mongoose = require('mongoose');

const CasesSchema = new mongoose.Schema(
    {
        'model': { type: String, required: true },
        'brand': { type: String, required: true },
        'category': { type: String, required: true },
        'type': { type: String, required: true },
        'generalUse': { type: String, required: true },
        'competence': { type: String, required: true },
        'priceAverage': { type: Number, required: true },
        'images': Array,
        'createdBy': {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        'status': {
            type: String,
            enum: ['PENDING', 'APPROVE'],
            default: 'PENDING'
        }
    },
    {
        versionKey: false,
        timestamps: true
    });

module.exports = app => mongoose.model('cases', CasesSchema);