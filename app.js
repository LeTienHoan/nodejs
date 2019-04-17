// import { request } from 'http';

const express = require('express')

const app = express()
const morgan = require('morgan')
var mongoose = require('mongoose')
var MongoClient = require('mongodb').MongoClient , assert = require('assert');
var bodyParser = require('body-parser')
const gradeRouters = require('./api/routes/grade')
const semesterRouters = require('./api/routes/semester')
const weekRouters = require('./api/routes/week')
const dayRouters = require('./api/routes/day')
const lessonRouters = require('./api/routes/lesson')
const taskRouters = require('./api/routes/task')
const userRouters = require('./api/routes/user')
const questionRouters = require('./api/routes/question')
const pointRouters = require('./api/routes/point')
const listRouters = require('./api/routes/list_name')
const questiontypeRouters = require('./api/routes/questionType')
const questionsemesterRouters = require('./api/routes/questionSemester')
var url = 'mongodb://localhost:27017/hoanlt'
var fs = require('fs')
var path = require('path')
var Grid = require('gridfs-stream')
var db;
var server = require("http").Server(app);
// var io = require("socket.io")(server);
// io.on("connection", function(socket){

//     console.log("Co nguoi ket noi:" + socket.id);

//     socket.on("disconnect", function(){
//         console.log(socket.id + " ngat ket noi!!!!!");
//     });

// });
Grid.mongo = mongoose.mongo;
mongoose.connect(url, {
  });
  
  var conn = mongoose.connection;
  
  conn.once('open', function () {
    console.log('connected mongodb');
  });
 
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET')
        return res.status(200).json({})
    }
    next();
  });
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log(db)
//     var dbo = db.db("hoanlt");
//     console.log('MONGOOSE CONNECT SUCESS')
//     dbo.collection("grade").findOne({}, function(err, result) {
//       if (err) throw err;
//       console.log(result.name);
//       db.close();
//     });
//   });
var connect = require('connect');
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// CORS
app.use('/test', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/test', (req, res, next) => {
    res.status(200).json({
        message: 'it works'
    })
})

app.use('/grades', gradeRouters)
app.use('/semesters', semesterRouters)
app.use('/weeks', weekRouters)
app.use('/days', dayRouters)
app.use('/lessons', lessonRouters)
app.use('/tasks', taskRouters)
app.use('/users', userRouters)
app.use('/questions', questionRouters)
app.use('/points', pointRouters)
app.use('/lists', listRouters)
app.use('/questiontypes', questiontypeRouters)
app.use('/questionsemesters', questionsemesterRouters)
// Handle err
app.use((req, res, next) => {
    const error = new Error('Resource not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app

