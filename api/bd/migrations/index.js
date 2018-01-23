
const getCategoryFields = require("./category")
const getProductFields = require("./product").getProductFields
const updateImageDescripcion = require("./product").updateImageDescripcion
const getLocationsFields = require("./locations")
const updateFieldsLocations = require("./upadateLocations")
const getRentFields = require("./rentalHorarios")
const getPricingFields = require("./pricing")
const getRowsCount = require("./test")

function migraCategoryFields (req, res){
    getCategoryFields(req, res)
}

function migraProductFields(req, res){
    getProductFields(req, res)
}

function migraProduct_Rent_locationFields (req, res){
    getLocationsFields(req, res)
}

module.exports = {
    migraCategoryFields,
    migraProductFields,
    migraProduct_Rent_locationFields,
    getRowsCount,
    updateFieldsLocations,
    getRentFields,
    getPricingFields,
    updateImageDescripcion
}