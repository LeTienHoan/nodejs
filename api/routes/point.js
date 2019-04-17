const express = require('express')
const router = express.Router() 
const mongoose = require('mongoose')

const Point = require('../model/point')
var ObjectId = require('mongodb').ObjectID;
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}
router.get('/', (req, res, next) => {
    Semester.db.collection("semester").find().toArray(function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
          } else {
            res.status(200).json({
                total: data.length,
                data: data
            });
          }
    })
})

router.get('/:id_user', (req, res, next) => {
    // .aggregate([
    //     { $match: {id_user: req.params.id_user, point: {$gte: 80}}}
    //  ].
    console.log('....req.query', typeof (req.query))
    if (req.query.id_grade) {
        Point.aggregate([
            { 
                $match: {
                    id_lesson: req.query.id_lesson,
                    id_day: req.query.id_day,
                    id_week: req.query.id_week,
                    id_semester: req.query.id_semester,
                    id_grade: req.query.id_grade
                }
            }
        ], function(err, data) {
            if (err) {
                handleError(res, err.message, "Failed to get contacts.");
            } else {
                res.status(200).json({
                    total: data.length,
                    data: data
                })
            }
        })
    } else {
        Point.aggregate([
            { 
                $match: {
                    id_user: req.params.id_user,
                    point: {$gte: 80}
                }
            }
        ], function(err, data) {
            if (err) {
                handleError(res, err.message, "Failed to get contacts.");
            } else {
                res.status(200).json({
                    total: data.length,
                    data: data
                })
            }
        })
    }
    
})

router.put('/:id', (req, res, next) => {
    var newUser = req.body;
    console.log('>>>>>>>req.body', req.body)
    Point.findOneAndUpdate({_id: ObjectId(req.params.id)}, {
        $set: req.body
    }, {new : true}, function(err, user) {
        if (err) {
            console.log("loi")
        } else {
            res.status(200).json(user)
        }
    });
})

router.delete('/:productId', (req, res, next) => {
    const productId = req.params.productId
    if (productId > 0) {
        res.status(200).json({
            message: 'Deleted'
        })
    } else {
        res.status(404).json({
            errCode: 12,
            message: 'Not found'
        })
    }
    
})

module.exports = router
