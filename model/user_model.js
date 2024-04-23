const mongoose = require('mongoose');
const UserSchema = new  mongoose.Schema({
    name  : {
        type:String,
        required :true, 
        trim:true,
    },
    email  : {
        type:String,
        required :true, 
        trim:true,
        unique: true 
    },
    password  : {
        type:String,
        required :true, 
        trim:true,
    },
    phonenumber :{
        type:String,
        required :true,
        length : 10,
        unique :true , 

    },  
    tc:{
        type:Boolean, 
        required:true, 
    }
});
const User = mongoose.model("user",UserSchema); 
module.exports = User; 