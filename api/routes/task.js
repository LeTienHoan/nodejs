const express = require('express')
const router = express.Router() 
const mongoose = require('mongoose')

const Task = require('../model/task')
const Obj = require('../model/grade')
const Point = require('../model/point')
var ObjectId = require('mongodb').ObjectID;
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}
router.get('/', (req, res, next) => {
    Task.find({},function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
          } else {
            res.status(200).json({
                total: data.length,
                data: data
            });
          }
    });
})

router.put('/:id', (req, res, next) => {
    var newUser = req.body;
    Task.findOneAndUpdate({_id: ObjectId(req.params.id)}, {
        $set: req.body
    }, {new : true}, function(err, data) {
        if (err) {
            console.log("loi")
        } else {
            res.status(200).json(data)
        }
    });
})

router.delete('/:id', (req, res, next) => {
    Task.findOneAndRemove({
        _id: ObjectId(req.params.id)
    }, function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data)
        }
    })
})

router.get('/:id_lesson', (req, res, next) => {
    Task.db.collection("task").find({id_lesson: req.params.id_lesson}).toArray(function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
          } else {
            res.status(200).json({
                total: data.length,
                data: data
            });
          }
    });
})
router.get('/detail/:id', (req, res, next) => {
    Task.db.collection("task").find({_id: ObjectId(req.params.id)}).toArray(function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
          } else {
            Point.find({id_lesson: data[0].id_lesson, id_user: req.query.id_user}, function(err, Userdata) {
                if (err) {
                    handleError(res, err.message, "Failed to get contacts.");
                } else {
                    if (Userdata.length === 0) {
                        res.status(200).json({
                            total: data.length,
                            data: data,
                            point: 0
                        });
                    } else {
                        res.status(200).json({
                            total: data.length,
                            data: data,
                            point: Userdata[0].point
                        });
                    }
                }
            })
            
          }
    });
})
router.put('/', (req, res, next) => {
    var newUser = req.body;
    console.log('>>>>>>111', req.body)
    Task.findOneAndUpdate({name: 'Task 3'}, {
        $set: req.body
    }, {new : true}, function(err, user) {
        if (err) {
            console.log("loi")
        } else {
            res.status(200).json(user)
        }
    });
})
router.post('/', (req, res, next) => {
    var newContact = req.body;
    Task.db.collection("task").find({name: req.body.name, id_lesson: req.params.id_lesson}).toArray(function(err, data){
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            if (data.length === 0) {
                Task.db.collection("task").insertOne(newContact, function(err1, doc) {
                    if (err1) {
                    } else {
                        res.status(200).json(doc)
                    }
                }) 
            }
        }
    });
})
module.exports = router
