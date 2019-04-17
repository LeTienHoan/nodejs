const express = require('express')
const router = express.Router() 
const mongoose = require('mongoose')

const Day = require('../model/day')
const Obj = require('../model/grade')
var ObjectId = require('mongodb').ObjectID;
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}
router.get('/', (req, res, next) => {
    Day.db.collection("day").find().toArray(function(err, data) {
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
    Day.findOneAndUpdate({_id: ObjectId(req.params.id)}, {
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
    Day.findOneAndRemove({
        _id: ObjectId(req.params.id)
    }, function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data)
        }
    })
})

router.get('/:id_week', (req, res, next) => {
    Day.db.collection("day").find({id_week: req.params.id_week}).toArray(function(err, data) {
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
    var newContact = req.body;
    Day.db.collection("day").find({name: req.body.name, id_week: req.body.id_week}).toArray(function(err, data){
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            if (data.length === 0) {
                Day.db.collection("day").insertOne(newContact, function(err1, doc) {
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
