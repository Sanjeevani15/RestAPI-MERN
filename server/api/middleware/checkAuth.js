const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
  
    try{
        const token=req.headers.authorization.split(" ")[1];
        console.log(token);
          //jwt.verify has two parameters , one is the token and second one is the secret key
        const verify=jwt.verify(token,'this is dummy text');
        console.log(verify);
        if(verify.userType=='admin')
        {
            next();     
        }
        else
        {
            return res.status(500).json({ msg : 'Unauthorized access, only admins can access this portal'})
        }

         
    }
    catch(error)
    {
        return res.status(401).json({
            msg:'Invalid token'
        })
    }

}