import mongoose from "mongoose"
async function connectDb() {
    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB")
    }
    catch (error) {
        console.log("Error occured while connecting to databse");
    }
}
export default connectDb;