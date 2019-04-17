const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question_name: String,
    id_lesson: String,
    choices: String,
    answer: Number,
    select: Number
},{
    collection: 'question'
})
module.exports = mongoose.model('Question', questionSchema)