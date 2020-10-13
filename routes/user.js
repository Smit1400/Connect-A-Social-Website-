const express = require('express');
const router = express.Router();
var imgModel = require('../models/post');
var path = require("path");
var fs = require('fs'); 
var multer = require('multer'); 

const storage = multer.diskStorage({
    destination : 'images/',
    filename : function(req,file,callback){
        callback(null,file.fieldname + '-'+Date.now()+ path.extname(file.originalname));
    }
});

const upload = multer({
    storage : storage,
    // limits:{fileSize:100}
    // fileFilter:function(req,file,callback){
    //     checkFileType(file,callback);
    // }
}).single('image');

function checkFileType(file,callback){
    //Allowed exts
    const filetypes = /doc|docx|pdf/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if(extname && mimetype)
    {
        return callback(null,true);
    }
    else{
        return callback("Error : Wrong File Format");
    }

}

router.get('/',(req,res)=>{
    imgModel.find({},(err, posts) => {
        if(err) throw err;
        else {
            res.render('index',{posts:posts});
        }
    });
});

router.get('/postimage',(req,res)=>{
    res.render('images');
});

router.post('/postimage', (req,res)=>{
    console.log(req.body);
    upload(req,res,(err)=>{
        if(err)
        {
            res.send(500,"Error uploading image");
        }
        else
        {
            var newpost = new imgModel();
            newpost.user_id = req.body.email;
            newpost.user_name = req.body.fullname;
            newpost.isText = req.body.isText;

            data = path.join('/images/' + req.file.filename);
            details = {
                image : data,
                message : req.body.message,
            };
            newpost.post_details = details;

            newpost.save( (err, result) => {
                if(err) {
                    console.log(err);
                    res.json({success : 'false'});
                }
                else {
                    res.redirect('/');
                }
            });
        }
    });
});

router.get('/posttext',(req,res)=>{
    res.render('text');
});

router.post('/posttext', (req,res)=>{
    console.log(req.body);
    var newpost = new imgModel();
    newpost.user_id = req.body.email;
    newpost.user_name = req.body.fullname;
    newpost.post_details = req.body.message;
    newpost.isText = req.body.isText;
    newpost.save( (err, result) => {
        if(err) {
            console.log(err);
            res.json({success : 'false'});
        }
        else {
            res.redirect('/');
        }
    })
    
});

module.exports = router;