const jwt = require('jsonwebtoken');
const User = require('../model/user_model');

const authmiddleware = async (req,res,next) =>{
    try {
        const token = req.header("x-auth-token");
        if(token){
            const verify =jwt.verify(token,"secret");
            if(!verify){
                res.status(401).send({"status":"failed","message":"Authorization denied, Token Verification failed"}); 

            }
            else{
                const id  = verify['userID'];
                req.user =await User.findById(id).select('-password'); 
                req.token = token ;
                next(); 
            }
        } else{
            res.send({"status":"failed","message":"access denied"}); 
        }
    }catch(err){
        console.log(err);
        res.send({"status":"failed","message":"Internal server error"});
        
    }

}
module.exports = authmiddleware ;