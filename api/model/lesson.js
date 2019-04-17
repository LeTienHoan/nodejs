const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema({
    name: String,
    id_day: String
},{
    collection: 'lesson'
})

module.exports = mongoose.model('Lesson', lessonSchema)