const express= require('express');
const router=express.Router();  //this router is from express
const Student=require('../model/student');
const mongoose=require('mongoose');
const checkAuth=require('../middleware/checkAuth');

//this is https - GET request
router.get('/',checkAuth,(req,res,next)=>{
    // res.status(200).json({
    //     message: 'this is student get request'
    // })

    Student.find()
    .then(result=>{
        res.status(200).json({
            studentData:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//when we want to retrieve a particular id 
router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            student:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}) 

// delete request
router.delete('/:id',(req,res,next)=>{
    Student.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'student removed',
            result:result
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:'something is going wrong',
            error:err
        })
    })
})


//put request : for updation
router.put('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name : req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender:req.body.gender
        }
    })
    .then(result=>{
        res.status(200).json({
            updatedStudent:result
        })
    })
    .catch(error=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})





router.get('/name',(req,res,next)=>{                               //in this get request we modidy the route with '/name'
    res.status(200).json({
        message: 'name of the student is sanjeevani bhandari'
    })
})





router.post('/',(req,res,next)=>{

        const student = new Student({
            _id: new mongoose.Types.ObjectId,      //this is predefined in mongoose
            name : req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender:req.body.gender
        })
    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})





module.exports=router;   //so that we can use this router in app.js


