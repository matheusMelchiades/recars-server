//FIELDS PERMISSIONS
db.fieldsPermissions.insertMany([
    {
        "userRole": "ADMIN",
        "fields": {
            "menu": [
                { "path": "/", "label": "Pesquisa" },
                { "path": "/case", "label": "Novo Caso" },
                { "path": "/penging", "label": "Pendencias" }
            ]
        }
    },
    {
        "userRole": "HELPER",
        "fields": {
            "menu": [
                { "path": "/", "label": "Pesquisa" },
                { "path": "/case", "label": "Novo Caso" }
            ]
        }
    },
    {
        "userRole": "USER",
        "fields": {
            "menu": [
                { "path": "/", "label": "Pesquisa" }
            ]
        }
    }
])

db.getCollection('cases').updateMany(
    {
        '_id': {
            '$in': [
                ObjectId("5ca1a0cccf7beecdc305cb9c"),
                ObjectId("5ca1a0cccf7beecdc305cb9e"),
                ObjectId("5ca1a0cccf7beecdc305cb9f"),
            ]
        }
    },
    {
        '$set': { status: '' }
    },
    {
        upsert: true
    }
)