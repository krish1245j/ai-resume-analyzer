import 'dotenv/config';
import app from "./src/app.js"
import connectDb from "./db/db.js";
import genrateInterviewReport from './src/services/ai.services.js';
import sampleData from "./src/services/test.js"

console.log(process.env.GEMINI_API_KEY)
connectDb();
genrateInterviewReport({
  resume: sampleData.resume,
  selfDescription: sampleData.selfDescription,
  jobDescription: sampleData.jobDescription
});
const port = process.env.PORT;
app.listen(port,()=>{ 
    console.log("Server is running at http//localhost:3000");
}) 