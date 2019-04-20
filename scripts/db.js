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