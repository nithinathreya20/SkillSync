const jwt=require('jsonwebtoken')

const authMiddleware=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token || !token.startsWith('Bearer ')){
        return res.status(401).json({msg:"invalid credentials"});
    }
    const newToken=token.split(' ')[1];
    try{
        const decoded=jwt.verify(newToken,process.env.JWT_KEY);
        req.user=decoded.id;
        next();
    }
    catch(err){
        res.status(401).json({msg:"Token is not valid"});
    }
}
module.exports=authMiddleware;