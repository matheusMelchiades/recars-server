/* eslint-disable */

const atributes = [
    {
        "search": {
            "field": "places",
            "label": "Lugares"
        },
        "register": {
            "field": "category",
            "label": "Categoria"
        },
        "options": [
            {
                "parent": "Até 2 Lugares",
                "childrens": [
                    "Conversiveis",
                    "Hatch pequeno"
                ]
            },
            {
                "parent": "Até 3 Lugares",
                "childrens": [
                    "Conversivel de 4 lugar",
                    "Hatch compacto"
                ]
            },
            {
                "parent": "4 ou mais Lugares",
                "childrens": [
                    "Hatch maior",
                    "Sedã compacto",
                    "Sedã medio",
                    "monovolume compacto",
                    "monovolume grande",
                    "Perua media",
                    "Sedã grande"
                ]
            },
        ]
    },
    {
        "search": {
            "field": "placeUsed",
            "label": "Local de uso"
        },
        "register": {
            "field": "type",
            "label": "Tipo"
        },
        "options": [
            {
                "parent": "Cidade, com transito pesado",
                "childrens": [
                    "confortável e com câmbio automático"
                ]
            },
            {
                "parent": "Na cidade sem transito",
                "childrens": [
                    "carro básico e com câmbio manual"
                ]
            },
            {
                "parent": "Na estrada, com piso bom",
                "childrens": [
                    "baixo e veloz"
                ]
            },
            {
                "parent": "Na estrada, com piso ruim",
                "childrens": [
                    "SUV / picapes"
                ]
            },
            {
                "parent": "Na terra  ou na areia",
                "childrens": [
                    "4x4 / terra"
                ]
            }
        ]
    },
    {
        "search": {
            "field": "classUSe",
            "label": "Classificação de uso"
        },
        "register": {
            "field": "generalUse",
            "label": " Geral"
        },
        "options": [
            {
                "parent": "Tarefas do dida dia",
                "childrens": ["Tarefas do dida dia"]
            },
            {
                "parent": "Locomoção pessoal / passeio",
                "childrens": ["Locomoção pessoal / passeio"]
            },
            {
                "parent": "Ostentação/impressionar",
                "childrens": ["Ostentação/impressionar"]
            },
            {
                "parent": "Dirigir com prazer",
                "childrens": ["Dirigir com prazer"]
            }
        ]
    },
    {
        "search": {
            "field": "motor",
            "label": "Motor"
        },
        "register": {
            "field": "competence",
            "label": "Competencia"
        },
        "options": [
            {
                "parent": "Potente",
                "childrens": ["Potente"]
            },
            {
                "parent": "Economico",
                "childrens": ["Economico"]
            },
            {
                "parent": "Potente / Economico",
                "childrens": ["Potente / Economico"]
            },
        ]
    }
]



db.getCollection('attributes_copy').aggregate([
    { $project: { options: 1 } }
])

db.getCollection('attributes_copy').aggregate([
    { $group: {_id: null, childrens: {$push: "$options.childrens"}}}
])

db.getCollection('attributes_copy').aggregate([
    { $group: {_id: null, childrens: {$push: "$options.parent"}}},
    { $project: {_id: 0,'childrens': 1}}
])