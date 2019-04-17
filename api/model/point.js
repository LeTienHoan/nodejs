const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
    user_reply: String,
    id_user: String,
    id_lesson: String,
    name_lesson: String,
    id_day: String,
    name_day: String,
    id_week: String,
    name_week: String,
    id_semester: String,
    name_semester: String,
    id_grade: String,
    name_grade: String,
    point: Number,
    count_submit: Number,
    star: String,
    comment: String
},{
    collection: 'point'
})
module.exports = mongoose.model('Point', pointSchema)