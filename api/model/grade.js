const mongoose = require('mongoose')

const gradeSchema = new mongoose.Schema({
    name: String
},{
    collection: 'grade'
})
module.exports = mongoose.model('Grade', gradeSchema)
