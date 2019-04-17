const mongoose = require('mongoose')

const listNameSchema = new mongoose.Schema({
    name: String,
    type: Number
},{
    collection: 'list_name'
})
module.exports = mongoose.model('listName', listNameSchema)
