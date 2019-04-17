const express = require('express')
const router = express.Router() 
const mongoose = require('mongoose')

const Grade = require('../model/grade')
const Obj = require('../model/grade')
var ObjectId = require('mongodb').ObjectID;
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var bodyParser = require('body-parser');
var multer = require('multer');
var formidable = require('formidable');
var fs = require('fs');
global.__basedir = __dirname;
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

router.use(bodyParser.json());
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, __basedir + '/uploads/')
	},
	filename: (req, file, cb) => {
	  cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
	}
});
 
var upload = multer({storage: storage});
router.post('/upload', upload.single("filetoupload"), (req, res) => {
    console.log(req.file);
    res.json({'msg': 'File uploaded successfully!', 'file': req});
});
router.post('/fileattachs/upload', function(req, res) {
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload
        // return res.end()
        var exceltojson;
        if(files.filetoupload.name.split('.')[files.filetoupload.name.split('.').length-1] == 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: files.filetoupload.path,
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
    })
});

router.get('/', (req, res, next) => {
    Grade.db.collection("grade").find().toArray(function(err, data) {
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

router.post('/', (req, res) => {
    console.log('>>>>>>>>>>>>>>...123',req.body)
    var newContact = req.body;
    console.log(req.body)
    Grade.db.collection("grade").find({name: req.body.name}).toArray(function(err, data){
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
          } else {
              if (data.length === 0) {
                Grade.db.collection("grade").insertOne(newContact, function(err1, doc) {
                    if (err1) {
                    } else {
                        res.status(200).json(doc)
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

router.delete('/:id', (req, res, next) => {
    Grade.findOneAndRemove({
        _id: ObjectId(req.params.id)
    }, function(err, data) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data)
        }
    })
    
})

// router.delete('/:id_grade', (req, res, next) => {
//     Product.db.collection(CONTACTS_COLLECTION).deleteOne({id_grade: req.params.id_grade}, function(err, result) {
//         if (err) {
//           handleError(res, err.message, "Failed to delete contact");
//         } else {
//           res.status(200).json(req.params.id);
//         }
//       });
// })

module.exports = router
