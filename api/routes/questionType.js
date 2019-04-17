const express = require('express')
const router = express.Router() 
const mongoose = require('mongoose')
const QuestionType = require('../model/questionType')
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}
router.get('/', (req, res, next) => {
    QuestionType.find({}, function(err, data) {
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

router.post('/', (req, res, next) => {
    var newContact = req.body;
    console.log('>>>>>>>>>', req.body)
    QuestionType.find({name: req.body.name}, function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            if (data.length === 0) {
                QuestionType.create(req.body, function(err, data1) {
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

router.delete('/:id', (req, res, next) => {
    QuestionType.findOneAndRemove({
        _id: ObjectId(req.params.id)
    }, function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data)
        }
    })
})


module.exports = router
