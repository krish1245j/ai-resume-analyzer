import mongoose from "mongoose"
async function connectDb() {
    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB")
    }
    catch (err) {
        console.log("Error occured :",err);
    } 
}
export default connectDb;