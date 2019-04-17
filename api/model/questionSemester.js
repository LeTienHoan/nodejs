const mongoose = require('mongoose')

const questionSemesterSchema = new mongoose.Schema({
    name: String,
    question_name: String,
    id_lesson: String,
    choices: String,
    answer: String,
    select: Number,
    type: Number,
    text: String,
    time: Number,
    id_lesson: String
},{
    collection: 'questionSemester'
})
module.exports = mongoose.model('questionSemester', questionSemesterSchema)