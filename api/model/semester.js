const mongoose = require('mongoose')

const semesterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    id_grade: String
},{
    collection: 'semester'
})

module.exports = mongoose.model('Semester', semesterSchema)
