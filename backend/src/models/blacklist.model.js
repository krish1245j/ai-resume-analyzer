import mongoose from "mongoose";

const tokenBlacklistSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token is requires to blacklist"],
        unique:true
    }
},{
    timestamps:true
})
tokenBlacklistSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });
const tokenBlacklistModel=mongoose.model("tokenBlacklist",tokenBlacklistSchema);
export default tokenBlacklistModel;