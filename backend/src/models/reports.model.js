import mongoose from "mongoose"

const reportsSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    response:{
        type:mongoose.Schema.Types.Mixed,
        required:[true,"Response is required"]
    }

},{timestamps:true})

const reportsModel=mongoose.model("reports",reportsSchema);

export default reportsModel;