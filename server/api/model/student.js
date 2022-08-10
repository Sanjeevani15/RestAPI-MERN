const mongoose=require('mongoose');
const studentSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,      //this is predefined in mongoose
    name : String,
    email: String,
    phone: Number,
    gender:String
})

module.exports=mongoose.model('Student', studentSchema);   //this 'Student' will be used in routes/student page 