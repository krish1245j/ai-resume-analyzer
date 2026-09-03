import reportsModel from "../models/reports.model.js";
import genrateInterviewReport from "../services/ai.services.js";

async function createInterviewReport(req, res) {
  try {
    const { resume, selfDescription, jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        message: "Job Description is required",
      });
    }

    const report = await genrateInterviewReport({
      resume,
      selfDescription,
      jobDescription,
    });
    console.log(report)
    await reportsModel.create({
      user:req.user.id,
      response:report
    })
    
    return res.status(200).json(report);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to generate report",
    });
  }
}

async function getAllReports(req,res) {
  const user=req.user.id;
  const reports=await reportsModel.find({
    user:user
  }).sort({ createdAt: -1 })
  return res.status(200).json({
    message:"Reports found sucessfully",
    reports
  })
}

async function getReport(req,res) {
  const id=req.params.id;
  const user=req.user.id;
  if(!id){
    return res.status(404).json({
      message:"Id is required"
    })
  }
  const report=await reportsModel.findOne({
    _id:id,
    user:user
  })
  if(!report){
    return res.status(404).json({
      message:"Report Not Found"
    })
  }
  return res.status(200).json({
    message:"Report found sucessfully",
    report
  })
}

export default {
  createInterviewReport,getAllReports,getReport
};