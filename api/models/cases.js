const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
        'status': {
            type: String,
            enum: ['PENDING', 'APPROVE'],
            default: 'PENDING'
        },
        'quantity': {
            type: Number,
            default: 1
        },
        'createdBy': {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

CasesSchema.statics.createCase = function (oneCase) {
    return new Promise((resolve, reject) => {
        const images = oneCase.images;
        delete oneCase.images;

        this.findOne(oneCase, (err, caseDb) => {
            if (err) return reject(err);

            if (!caseDb) {
                this.create({ ...oneCase, images }, (err, caseCreated) => {
                    if (err) return reject(err);

                    return resolve(caseCreated);
                });
            } else {
                this.update({ _id: ObjectId(caseDb._id) },
                    {
                        '$set': {
                            'quantity': caseDb.quantity + 1,
                            'status': 'PENDING'
                        }
                    },
                    { upsert: true }, (err, caseUpdated) => {
                        if (err) return reject(err);
                        return resolve(caseUpdated);
                    }
                );
            }
        });
    });
};

CasesSchema.statics.findPending = function () {
    return this.find({ status: 'PENDING' }).populate('createdBy', { _id: 1, username: 1 });
};

CasesSchema.statics.findApproved = function () {
    return this.find({ status: 'APPROVE' }).populate('createdBy', { _id: 1, username: 1 });
};

CasesSchema.statics.ApprovePendencies = function (pendencies) {

    const query = {
        '_id': {
            '$in': pendencies.map((casePend) => ObjectId(casePend._id))
        }
    };

    return this.updateMany(query, { '$set': { status: 'APPROVE' } }, { upsert: true });
};

CasesSchema.statics.findBeetweenPrices = function (priceAverage = 0, value) {
    // const price = parseInt(priceAverage);
    // const max = parseInt(price + value);
    // const min = parseInt(price - value);

    return this.findApproved({
        'status': 'APPROVE',
        'priceAverage': {
            '$lt': priceAverage
            // '$gt': min
        }
    });
};

module.exports = app => mongoose.model('cases', CasesSchema);