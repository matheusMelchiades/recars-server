const mongoose = require('mongoose');

const CasesSchema = new mongoose.Schema(
    {
        'model': String,
        'brand': String,
        'category': String,
        'type': String,
        'generalUse': String,
        'competence': String,
        'price': String,
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