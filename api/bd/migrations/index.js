
const getCategoryFields = require("./category")
const getProductFields = require("./product")

function migraCategoryFields (req, res){
    getCategoryFields(req, res)
}

function migraProductFields(req, res){
    getProductFields(req, res)
}

module.exports = {
    migraCategoryFields,
    migraProductFields
}