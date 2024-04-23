const express = require('express');
const router = express.Router(); 
const auth  =require('../middleware/auth_middleware');
const controller = require("../controller/auth_controllers");
const User = require('../model/user_model');
const jwt= require('jsonwebtoken');

router.get("/tokenVerify",async(req,res) =>{
    try{
        const token = req.header("x-auth-token"); 
        if(!token) res.send(false);
        const isvalid = await jwt.verify(token,"secret"); 
        if(!isvalid) res.send(false);
        const id  = isvalid['userID'];
        const user = await User.findById(id); 
        if(!user) res.send(false);
        res.send(true); 
    }catch(e){
        console.log(e);
        res.send({"status":"failed","message":"Internal Server error"}); 
    }
}); 
router.get("/",auth,async(req,res)=> {
    const user = await User.findById(req.user); 
    res.json({"status":"success","user":user,"token":req.token});
});
router.post("/register",controller.registration);
router.post("/login",controller.login); 

module.exports = router; 