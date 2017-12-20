
const getCategoryFields = require("./category")

function migraCategoryFields (req, res){
    getCategoryFields(req, res)
}


module.exports = {
    migraCategoryFields
}