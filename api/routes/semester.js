const express = require('express')
const router = express.Router() 
const mongoose = require('mongoose')
const Semester = require('../model/semester')
var ObjectId = require('mongodb').ObjectID;
var formidable = require('formidable');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var bodyParser = require('body-parser');
const multer = require('multer');
var fileSystem = require('fs');
var util = require('util');
const { Readable } = require('stream');
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
router.post('/fileattachs/upload', function(req, res) {
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files) {
        var oldpath = files.track
        // return res.end()
        console.log('>>>>>.files.filetoupload.name', files.track)
        var exceltojson;
        if(files.track.name.split('.')[files.track.name.split('.').length-1] == 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: files.track.path,
                output: null,
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                } 
                res.json({error_code:0,err_desc:null, data: result});
            });
        } catch (e){
            res.json({error_code:1,err_desc:"Corupted excel file"});
        }
    // })
    // console.log('>>>>>>>>>>>>body', req)
    // console.log('>>>>>>>>>>>>query', req.query)
    // console.log('>>>>>>>>>>>>params', req.params)
    // var form = new formidable.IncomingForm()
    // form.parse(req, function (err, fields, files) {
    //     var oldpath = files.track
        // console.log('>>>>>>>>>>>>oldpath', db)
        // console.log('>>>>>>>>>>>>oldpath123', req)
        // return res.end()
        // var stat = fileSystem.statSync(files.track.name);
        // console.log('>>>>>>>>>>>>stat', stat)
        // res.writeHead(200, {
        //     'Content-Type': 'audio/mpeg',
        //     'Content-Length': files.track.size
        // });
        // var readStream = fileSystem.createReadStream(files.track.name);
        // let downloadStream = readStream.pipe(res)
        // downloadStream.on('data', (chunk) => {
        //     res.write(chunk);
        //   });
        
        //   downloadStream.on('error', () => {
        //     res.sendStatus(404);
        //   });
        
        //   downloadStream.on('end', () => {
        //     res.end();
        //   });
        // const readableTrackStream = new Readable();
        // console.log('>>>>>>>>>readableTrackStream', readableTrackStream)
    })
});
router.put('/:id', (req, res, next) => {
    var newUser = req.body;
    console.log('>>>>>.req.params.id', req.params.id)
    Semester.findOneAndUpdate({_id: ObjectId(req.params.id)}, {
        $set: req.body
    }, {new : true}, function(err, user) {
        if (err) {
            console.log("loi")
        } else {
            res.status(200).json(user)
        }
    });
})
router.get('/:id_grade', (req, res, next) => {
    Semester.db.collection("semester").find({id_grade: req.params.id_grade}).toArray(function(err, data) {
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

router.delete('/:id', (req, res, next) => {
    Semester.findOneAndRemove({
        _id: ObjectId(req.params.id)
    }, function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data)
        }
    })
})

router.post('/', (req, res, next) => {
    var newContact = req.body;
    Semester.db.collection("semester").find({name: req.body.name, id_grade: req.body.id_grade}).toArray(function(err, data){
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            if (data.length === 0) {
                Semester.db.collection("semester").insertOne(newContact, function(err1, doc) {
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
