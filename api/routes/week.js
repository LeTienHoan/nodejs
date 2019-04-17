const express = require('express')
const router = express.Router() 
const mongoose = require('mongoose')

const Week = require('../model/week')
const Obj = require('../model/grade')
var ObjectId = require('mongodb').ObjectID;
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}
router.get('/', (req, res, next) => {
    Week.db.collection("week").find().toArray(function(err, data) {
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
    Week.findOneAndUpdate({_id: ObjectId(req.params.id)}, {
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
    Week.findOneAndRemove({
        _id: ObjectId(req.params.id)
    }, function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data)
        }
    })
})

router.get('/:id_semester', (req, res, next) => {
    Week.db.collection("week").find({id_semester: req.params.id_semester}).toArray(function(err, data) {
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
    Week.db.collection("week").find({name: req.body.name, id_semester: req.body.id_semester}).toArray(function(err, data){
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
          } else {
              if (data.length === 0) {
                Week.db.collection("week").insertOne(newContact, function(err1, doc) {
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
