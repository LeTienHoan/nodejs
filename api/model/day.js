const mongoose = require('mongoose')

const daySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    id_week: String
},{
    collection: 'day'
})

module.exports = mongoose.model('Day', daySchema)