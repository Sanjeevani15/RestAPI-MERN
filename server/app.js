const express=require ('express');
const router=express.Router();  //this router is from express


const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt=require('jsonwebtoken');


const app=express();

const studentRoute=require('./api/routes/student');     //path of student route 
const facultyRoute=require('./api/routes/faculty');

const userRoute=require('./api/routes/user');

const mongoose=require('mongoose');
const bodyParser=require('body-parser');

/*this string inside connect :on mongoose: click on cluster then connect and  then connect your application 
then we get the string do not forget to replace password in the string */
mongoose.connect('mongodb+srv://sanjeevani15:atlas123@intro.6ggtbvn.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log("error found : connection failed");
});

mongoose.connection.on('connected',connected=>{
    console.log('connected successfully with the database.....');
});

//we have to use bodyparser before including routes
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/student',studentRoute);
app.use('/faculty',facultyRoute);
// app.use('/user',userRoute,req,res,next);

// app.use((req,res,next)=>{
//       //200 is a status code means okay
//     res.status(200).json({
//         message: 'app is running on some localhost 3000'
//     })
// })

//error handling




app.post('/user/signup',async(req,res,next)=>{
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


app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad request: url not found'
    })
})




module.exports=app;
