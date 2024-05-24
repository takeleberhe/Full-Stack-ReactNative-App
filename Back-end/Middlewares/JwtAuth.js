const jwt=require('jsonwebtoken')
exports.JwtAuth=async(req,res,next)=>{
    const token=req.cookies.token
    try {
         const user=jwt.verify(token,JWT_SECRET_KEY);
         request.user=user;
    } catch (error) {
        res.clearCookie(token);
        return res.redirect('/');
    }     
}