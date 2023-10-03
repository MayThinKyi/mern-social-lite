const {verify}=require('jsonwebtoken')
const validateToken=(req,res,next)=>{
    const accessToken=req.header('token');
    if(!accessToken) res.status(400).json({error:'JWT must provide!!'}).end()
    try {
        const match=verify(accessToken,'importantSecret')
        if(match) next()
        else res.status(400).json({error:'JWT is not match!!'})
    } catch (error) {
        
    }
    
}
module.exports={validateToken}