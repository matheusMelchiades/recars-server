db.getCollection('cases_copy').updateMany({
    '_id': {
        '$in': [
            ObjectId("5ca1a0cccf7beecdc305cb9c"),
            ObjectId("5ca1a0cccf7beecdc305cb9e"),
            ObjectId("5ca1a0cccf7beecdc305cb9f"),
        ]
    }
}, {
        '$set': { status: '' }
    }, { upsert: true })