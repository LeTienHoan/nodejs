const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    phone: Number,
    adress: String,
    permission: String,
    gender: Number,
    fullname: String,
    open: {
        type: Array, ref: 'observationsSchem'
    }

}, {
    collection: 'user'
})
const observationsSchema = new mongoose.Schema({
    grade: Number,
    semester: Number,
    week: Number,
    day: Number,
    lesson: Number,
    task: Number
})

module.exports = mongoose.model('User', userSchema)