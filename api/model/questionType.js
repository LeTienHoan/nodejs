const mongoose = require('mongoose')

const questionTypeSchema = new mongoose.Schema({
    name: String,
    question_name: String,
    id_lesson: String,
    choices: String,
    answer: String,
    select: Number,
    type: Number,
    text: String,
    time: Number
},{
    collection: 'questionType'
})
module.exports = mongoose.model('questionType', questionTypeSchema)