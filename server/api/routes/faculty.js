const express= require('express');
const router=express.Router();  //this router is from express

//this is https - GET request
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'this is faculty get request'
    })
})

router.get('/name',(req,res,next)=>{                               //in this get request we modidy the route with '/name'
    res.status(200).json({
        message: 'name of the faculty is sanjeevani bhandari'
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message: 'this is faculty post request'
    })
})





module.exports=router;   //so that we can use this router in app.js


