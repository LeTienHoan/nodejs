const express = require('express')
const router = express.Router() 
const mongoose = require('mongoose')

const Question = require('../model/question')
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

router.get('/:id_lesson', (req, res, next) => {
    Question.db.collection("question").find({id_lesson: req.params.id_lesson}).toArray(function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
          } else {
            res.status(200).json({
                total: data.length,
                data: data
            })
          }
    })
})

router.post('/', (req, res, next) => {
    Question.create(req.body, function(err, data1) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data1)
        }
    })
})

router.post('/:id_lesson', (req, res, next) => {
    var newContact = req.body;
    var user_reply = JSON.parse(newContact.user_reply)
    var point = 0
    Question.find({id_lesson: req.params.id_lesson}, function(err, data) {
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
                    console.log('>>>>>>length11', data.length)
                    // if(Userdata.length === 0) {
                        console.log('>>>>>>length')
                        for (var key in user_reply) {
                            if (Number(user_reply[key]) === Number(data[key].answer)) {
                                point = point + 1
                            }
                        }
                        console.log('>>>>>>length11111', Math.round((point/data.length)*100))
                        if ((point/data.length)*100 >= 80) {
                            if (Userdata.length === 0) {
                                Object.assign(req.body, {point: Math.round((point/data.length)*100)})
                                Point.create(req.body, function(err1, data1) {
                                    if (err1) {
                                        handleError(res, err1.message, "Failed to get contacts.");
                                    } else {
                                        res.status(200).json({
                                            total: data.length,
                                            point: Math.round((point/data.length)*100),
                                            data: data
                                        })
                                    }
                                })
                            } else {
                                Object.assign(req.body, {point: Math.round((point/data.length)*100)})
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
                                            point: Math.round((point/data.length)*100),
                                            data: data1
                                        })
                                    }
                                });
                            }
                        } else {
                            Object.assign(req.body, {point: Math.round((point/data.length)*100)})
                            if (Userdata.length === 0) {
                                Object.assign(req.body, {count_submit: 1})
                                Point.create(req.body, function(err1, data1) {
                                    if (err1) {
                                        handleError(res, err1.message, "Failed to get contacts.");
                                    } else {
                                        res.status(200).json({
                                            total: data1.length,
                                            point: (point/data.length)*100,
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
                                            point: Math.round((point/data.length)*100),
                                            data: data1
                                        })
                                    }
                                });
                            }
                        }
                        
                    // } else {
                    //     res.status(200).json({
                    //         text: 'Bạn đã kiểm tra'
                    //     })
                    // }
                }
            })
        }
    })
})

router.delete('/:id_grade', (req, res, next) => {
    Product.db.collection(CONTACTS_COLLECTION).deleteOne({id_grade: req.params.id_grade}, function(err, result) {
        if (err) {
          handleError(res, err.message, "Failed to delete contact");
        } else {
          res.status(200).json(req.params.id);
        }
      });
})

router.get('/:productId', (req, res, next) => {
    const productId = req.params.productId
    Product.findById(productId)
        .exec()
        .then(doc => {
            console.log(doc)
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({
                errCode: 12,
                message: 'Not found'
            })
        })
    
})

router.patch('/:productId', (req, res, next) => {
    const productId = req.params.productId
    if (productId > 0) {
        res.status(200).json({
            productId: 12,
            productName: 'sp12'
        })
    } else {
        res.status(404).json({
            errCode: 12,
            message: 'Not found'
        })
    }
    
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
