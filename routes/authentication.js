const express = require('express');
const User  = require('../models/user');
var router = express.Router()



module.exports = (router) => {

    router.post('/register', (req,res) => {
        if(!req.body.email){
            res.json({success : false, message : "You must provide an e-mail"});
        }else if(!req.body.username){
            res.json({success : false, message : "You must provide an username"});
        }else if(!req.body.password){
            res.json({success : false, message : "Password cannot be blank"}); 
        }else{
            let user = new User({
                email : req.body.email.toLowerCase(),
                username : req.body.username.toLowerCase(),
                password : req.body.password
            })

            user.save((err) => {
                if(err){
                    res.json({success : false , message : "Could not save user" , err})
                }
                else{
                    console.log(user);
                    res.json({success : true , message : "User Saved!"})
                }
            });
        }
        
    });

    return router;
}