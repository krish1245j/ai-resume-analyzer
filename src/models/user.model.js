import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"Username is already taken"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email already exist"]
    },
    password:{
        type:String,
        required:true
    }

})

const userModel=mongoose.model("users",userSchema);

export default userModel;