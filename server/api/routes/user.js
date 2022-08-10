const express= require('express');
const router=express.Router();  //this router is from express
const mongoose=require('mongoose');
const User=require('../model/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt=require('jsonwebtoken');

// router.get('/',(req,res,next)=>{
//     res.status(200).json({
//         message:'This route is working'
//     })
// })



router.get('/',(req,res,next)=>{
    // res.status(200).json({
    //     message: 'this is student get request'
    // })

    User.find()
    .then(result=>{
        res.status(200).json({
            userData:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})


//code for sign up
router.post('/signup',async(req,res,next)=>{
    console.log(req);
    bcrypt.hash(req.body.password, saltRounds,(err, hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }
        else{
            const user=new User({
            _id: new mongoose.Types.ObjectId,      //this is predefined in mongoose
            username : req.body.username,
            password : hash,
            phone:     req.body.phone,
            email:     req.body.email,
            userType:  req.body.userType
            })
        user.save()
        .then(result=>{
            res.status(200).json({
                new_user:result
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err,
            })
        })
        }
       
    })
})


//code for login
router.post('/login',(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({ 
                msg:'User does not exist'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result) //this happens when passaword does not match
            {
                return res.status(401).json({
                    msg:'Password does not match'
                })
            }
            if(result){
                //if the passwords match, we will make a token and send that token(we are using JWT in this)
                    const token=jwt.sign({
                        //these parameters are recognizeid later , we later the key value pairs of the paramaters which we want to use in making of token
                        username:user[0].username,
                        userType:user[0].userType,
                        email:user[0].email,
                        phone:user[0].phone
                    },
                    'this is dummy text',    //this is the secret key of jwt
                    {
                        expiresIn: "24h"
                    }
                    );
                    res.status(200).json({
                        username:user[0].username,
                        userType:user[0].userType,
                        email:user[0].email,
                        phone:user[0].phone,
                        token:token 
                    })

            }
        })

    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})


module.exports=router;
