const express = require('express')
const router = express.Router() 
const mongoose = require('mongoose')
const User = require('../model/user')
const Obj = require('../model/grade')
var ObjectId = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

router.get('/', (req, res, next) => {
    console.log('>>>>>>>>>', req.query)
    if (req.query.username) {
        User.findOne({username: req.query.username, password: req.query.password}, function(err, user) {
            if (err) {
                console.log("loi")
            } else {
                res.status(200).json(user)
            }
        });
    } else {
        User.findOne({_id: ObjectId(req.query.id)}, function(err, user) {
            if (err) {
                console.log("loi")
            } else {
                res.status(200).json(user)
            }
        });
    }
    
})

router.get('/:permission', (req, res, next) => {
    console.log('>>>>>>>>>123', req.params)
    User.find({permission: req.params.permission}, function(err, user) {
        if (err) {
            console.log("loi")
        } else {
            res.status(200).json(user)
        }
    });
})

router.put('/:id', (req, res, next) => {
    var newUser = req.body;
    User.findOneAndUpdate({_id: ObjectId(req.params.id)}, {
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
    User.findOneAndRemove({
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
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'letienhoan96@gmail.com',
          pass: 'Hoan_0105'
        }
      });
    var tr1 = '<center><table cellspacing="0" cellpadding="0" style="width: 650px;max-width: 650px;font-family: Arial, Helvetica, sans-serif;font-size: 14px;margin: auto;line-height: 18px;border: 1px solid #ddd;background: #fff;"><tbody style=""><tr><td><a href="https://seazone.seabank.com.vn/uu-dai-the" target="_blank"><table cellspacing="0" cellpadding="0" width="650" height="" align="left" border="0" style="background-repeat: no-repeat;"><tbody style=""><tr style=""><td valign="" style="padding: 20px 18px 10px 18px;display: flex;align-items: center;border-bottom: 1px solid #eee"><img width="150" src="https://lh3.google.com/u/0/d/1sbACqIdD13q2jK4o5_-_ZhCQ4k6ObUTP=w1366-h626-iv1"/><span style="float: right;font-size: 13px;"><b>Phần mềm học tiếng anh HOANLT</b></span></td></tr></tbody></table></a></td></tr>'
    var tr2 = '<tr><td style="padding: 10px 15px 0px 15px"><p style="margin: 10px">Xin chào ' + req.body.fullname + ', </p><p style="margin: 10px">Bạn đã tạo tài khoản thành công trên: hoctienganh.com </p></td></tr>'
    var tr3 = '<tr><td style="padding: 0px 40px 0px 40px"><p style="margin: 0px 10px 10px 10px">Tài khoản: ' + req.body.username + '</p><p style="margin: 10px">Mật khẩu: ' + req.body.password + '</p></td></tr>'
    var tr4 = '<tr style=""><td style="padding-left: 25px;padding-bottom: 10px;border-bottom: 1px solid #eee"><p style="margin: 0px 0px 10px 0px">Trân trọng cảm ơn!</p><p style="margin: 0px">Đội ngũ bảo mật của <span style="font-size: 13px;"><b>Phần mềm học tiếng anh HOANLT</b></span></p></td></tr><tr style=""><td valign="top" align="center" style=""><p style="margin: 10px">Liên hệ với chúng tôi</p><p style="margin: 10px"><a href="https://www.seabank.com.vn" target="_blank"><img style="margin-left: 5px" src="https://lh3.google.com/u/0/d/1mMJ___giCWqFYo92gKK5wiuAyLGgbqbX=w1366-h429-iv1"/></a><a href="tel:1900 555 587"><img style="margin-left: 5px" src="https://lh3.google.com/u/0/d/1adnNEfcL1ue76VFhvPY-w4227kZm3T1O=w1366-h429-iv1"/></a><a href="mailto:contact@seabank.com.vn"><img style="margin-left: 5px" src="https://lh3.google.com/u/0/d/129r6RKQscGGxdlyU6FwbpwgDwj73Wxtd=w1366-h429-iv1"/></a><a href="https://www.facebook.com/SeABankOfficialFanpage/" target="_blank"><img style="margin-left: 5px" src="https://lh3.google.com/u/0/d/1lYe1ji79BfbmlkvwqRcBwIYGI_6oVoMS=w1366-h429-iv1"/></a></p></td></tr><tr style="background: #d61820;color: #fff;font-size: 12px"><td align="center" style="padding-top: 10px;padding-bottom: 10px"><p style="margin: 0">PHẦN MỀM HỌC TIẾNG ANH HOANLT</p><p style="margin: 0">Hội sở: 234 Hoàng Quốc Việt | Tel: (+84 24) 3944 8688 | Fax: (+84 24) 3944 8689</p><p style="margin: 0">@ Bản quyền thuộc về Công ty HOANLT. Tất cả các quyền được bảo hộ.</p></td></tr></tbody></table></center>'
    var mailOptions = {
        from: 'letienhoan96@gmail.com',
        to: req.body.email,
        subject: 'Tạo tài khoản thành công',
        html: tr1 + tr2 + tr3 + tr4
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    var newContact = req.body;
    console.log('>>>>>>.req.body', req.body)
    User.findOne({username: req.body.username}, function(err, data) {
        if (err) {
        handleError(res, err.message, "Failed to get contacts.");
        } else {
            if (data === null) {
                console.log('áđasad')
                User.create(req.body, function(err, data1) {
                    if (err) {
                        handleError(res, err.message, "Failed to get contacts.");
                    } else {
                        res.status(200).json(data1)
                    }
                })
            }
        }
    })
})
module.exports = router
