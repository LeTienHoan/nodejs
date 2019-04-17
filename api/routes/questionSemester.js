const express = require('express')
const router = express.Router() 
const mongoose = require('mongoose')
const QuestionSemester = require('../model/questionSemester')
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;
const Point = require('../model/point')
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}
router.get('/:id', (req, res, next) => {
    QuestionSemester.find({id_lesson: req.params.id}, function(err, data) {
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
    QuestionSemester.create(req.body, function(err, data1) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data1)
        }
    })
})

router.post('/:id_lesson', (req, res, next) => {
    var newContact = req.body;
    // var user_reply = JSON.parse(newContact.user_reply)
    console.log('>>>>>>length111112222', newContact.user_reply)
    var point = 0
    QuestionSemester.find({id_lesson: req.params.id_lesson}, function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            Point.find({
                id_user: req.body.id_user, 
                id_lesson: req.body.id_lesson,
                id_day: req.body.id_day,
                id_week: req.body.id_week,
                id_semester: req.body.id_semester,
                id_grade: req.body.id_grade
            }, function(err, Userdata) {
                if (err) {
                    handleError(res, err.message, "Failed to get contacts.");
                } else {
                    for (var key in JSON.parse(data[0].answer)) {
                        console.log('>>>>>>>>>JSON.parse(data[0].answer)[key]', JSON.parse(data[0].answer)[key])
                        console.log('>>>>>>>>>newContact.user_reply[key]', JSON.parse(newContact.user_reply)[key])
                        if (JSON.parse(data[0].answer)[key] == JSON.parse(newContact.user_reply)[key]) {
                            point = point + 1
                        }
                    }
                    console.log('>>>>>>point', point)
                    if ((point/JSON.parse(data[0].choices).length)*100 >= 80) {
                        if (Userdata.length === 0) {
                            Object.assign(req.body, {point: Math.round((point/JSON.parse(data[0].choices).length)*100)})
                            Point.create(req.body, function(err1, data1) {
                                if (err1) {
                                    handleError(res, err1.message, "Failed to get contacts.");
                                } else {
                                    res.status(200).json({
                                        total: data1.length,
                                        point: Math.round((point/JSON.parse(data[0].choices).length)*100),
                                        data: data1
                                    })
                                }
                            })
                        } else {
                            Object.assign(req.body, {point: Math.round((point/JSON.parse(data[0].choices).length)*100)})
                            Point.findOneAndUpdate({
                                id_user: req.body.id_user,
                                id_lesson: req.body.id_lesson,
                                id_day: req.body.id_day,
                                id_week: req.body.id_week,
                                id_semester: req.body.id_semester,
                                id_grade: req.body.id_grade
                            }, {
                                $set: req.body
                            }, {new : true}, function(err, data1) {
                                if (err) {
                                    console.log("loi")
                                } else {
                                    res.status(200).json({
                                        total: data1.length,
                                        point: Math.round((point/JSON.parse(data[0].choices).length)*100),
                                        data: data1
                                    })
                                }
                            });
                        }
                    } else {
                        Object.assign(req.body, {point: Math.round((point/JSON.parse(data[0].choices).length)*100)})
                        if (Userdata.length === 0) {
                            Object.assign(req.body, {count_submit: 1})
                            Point.create(req.body, function(err1, data1) {
                                if (err1) {
                                    handleError(res, err1.message, "Failed to get contacts.");
                                } else {
                                    res.status(200).json({
                                        total: data1.length,
                                        point: (point/JSON.parse(data[0].choices).length)*100,
                                        data: data1
                                    })
                                }
                            })
                        } else {
                            if (Userdata[0].count_submit === 2) {
                                Object.assign(req.body, {count_submit: 0})
                            } else {
                                Object.assign(req.body, {count_submit: Userdata[0].count_submit + 1})
                            }
                            Point.findOneAndUpdate({
                                id_user: req.body.id_user,
                                id_lesson: req.body.id_lesson,
                                id_day: req.body.id_day,
                                id_week: req.body.id_week,
                                id_semester: req.body.id_semester,
                                id_grade: req.body.id_grade
                            }, {
                                $set: req.body
                            }, {new : true}, function(err, data1) {
                                if (err) {
                                    console.log("loi")
                                } else {
                                    res.status(200).json({
                                        total: data1.length,
                                        point: Math.round((point/JSON.parse(data[0].choices).length)*100),
                                        data: data1
                                    })
                                }
                            });
                        }
                    }
                }
            })
        }
    })
})

module.exports = router
