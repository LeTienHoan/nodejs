const mongoose = require('mongoose')

const weekSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    id_semester: String
},{
    collection: 'week'
})

module.exports = mongoose.model('Week', weekSchema)
