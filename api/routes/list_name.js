const express = require('express')
const router = express.Router() 
const mongoose = require('mongoose')
const List = require('../model/list_name')
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');

router.get('/', (req, res, next) => {
    List.find({type: req.query.type}, function(err, data) {
        if (err) {
            console.log("loi")
        } else {
            res.status(200).json({
                total: data.length,
                data: data
            })
        }
    });
})

router.post('/', (req, res) => {
    var newContact = req.body;
    console.log(req.body)
    List.db.collection("list_name").find({name: req.body.name}).toArray(function(err, data){
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            if (data.length === 0) {
                List.create(req.body, function(err, data1) {
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

router.put('/:id', (req, res, next) => {
    var newUser = req.body;
    Grade.findOneAndUpdate({_id: ObjectId(req.params.id)}, {
        $set: req.body
    }, {new : true}, function(err, user) {
        if (err) {
            console.log("loi")
        } else {
            res.status(200).json(user)
        }
    });
})
module.exports = router
