const mongoose = require('mongoose');

const CasesSchema = new mongoose.Schema(
    {
        'model': String,
        'branch': String,
        'category': String,
        'type': String,
        'generalUse': String,
        'competence': String,
        'price': String
    },
    {
        versionKey: false,
        timestamps: true
    });

module.exports = app => mongoose.model('cases', CasesSchema);