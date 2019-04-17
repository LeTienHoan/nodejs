const express = require('express')
const router = express.Router() 
const mongoose = require('mongoose')

const Lesson = require('../model/lesson')
const Obj = require('../model/grade')
var ObjectId = require('mongodb').ObjectID;
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}
router.get('/', (req, res, next) => {
    Lesson.db.collection("lesson").find().toArray(function(err, data) {
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
    Lesson.findOneAndUpdate({_id: ObjectId(req.params.id)}, {
        $set: req.body
    }, {new : true}, function(err, user) {
        if (err) {
            console.log("loi")
        } else {
            res.status(200).json(user)
        }
    });
})

router.delete('/:id', (req, res, next) => {
    Lesson.findOneAndRemove({
        _id: ObjectId(req.params.id)
    }, function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data)
        }
    })
})

router.get('/:id_day', (req, res, next) => {
    Lesson.db.collection("lesson").find({id_day: req.params.id_day}).toArray(function(err, data) {
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

router.post('/', (req, res, next) => {
    Lesson.find({name: req.body.name, id_day: req.params.id_day}, function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            if (data.length === 0) {
                Lesson.create(req.body, function(err, data1) {
                    if (err) {
                        handleError(res, err.message, "Failed to get contacts.");
                    } else {
                        res.status(200).json(data1)
                    }
                })
            }
        }
    });
})
module.exports = router
