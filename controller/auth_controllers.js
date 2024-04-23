const User = require('../model/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    static registration = async (req,res) =>{
        const {name,password,cpassword,email,phonenumber,tc} = req.body ;
        const user = await User.findOne({email :email }); 
        if (user){
            res.status(400).send({"status":"failed","message":"Email is already in use"}); 
        }
        else{
            if(name && password && cpassword && email ){
                if(cpassword === password){
                    const salt = await bcrypt.genSalt(10); 
                    const hashPassword = await bcrypt.hash(password,salt);
                    const newUser = new User({
                        name:name,
                        email:email,
                        password:hashPassword,
                        phonenumber:phonenumber,
                        tc:tc
                    });
                    await newUser.save();
                    const saved_user =await User.findOne({email:email});
                    const token = jwt.sign({userID:saved_user._id},"secret",{expiresIn : '15d'}); 
                    res.status(201).send({"status":"success", "message":"User created successfully","token":token});  
               
                }
                else {
                    res.send({"status":"failed","message":"Password didn't match"}); 
                }
            }
            else{
                res.send({"status":"failed","message":"All fields are required"}); 
            }
        }
    }
    static login = async (req,res) =>{
        const {email,password} = req.body ; 
        const user = await User.findOne({email:email}); 
       try {
        if (user){
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch && email){
                const token = jwt.sign({userID:user._id},"secret",{expiresIn : '15d'});
                res.send({"status":"success","message":"Login success","token":token});

            }
            else{
                res.send({"status":"failed","message":"Invalid Password or email"}); 
            }
        }
        else{
            res.send({"status":"failed","message":"user not found"}); 
        }
       }catch (err){
        console.log(err);
        res.send({"status":"failed","message":"Internal Server error"});
       }
    }
}
module.exports = AuthController ; 