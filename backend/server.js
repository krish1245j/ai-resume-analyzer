import 'dotenv/config';
import app from "./src/app.js"
import connectDb from "./db/db.js";

connectDb();
// genrateInterviewReport({
//   resume: sampleData.resume,
//   selfDescription: sampleData.selfDescription,
//   jobDescription: sampleData.jobDescription
// });
const port = process.env.PORT;
app.listen(port,()=>{ 
    console.log("Server is running at http//localhost:3000");
}) 
