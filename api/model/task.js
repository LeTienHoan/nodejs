const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: String,
    id_lesson: String,
    time: String,
    text: String,
    link: String,
    picture: String,
    worksheet: Boolean
},{
    collection: 'task'
})
module.exports = mongoose.model('Task', taskSchema)