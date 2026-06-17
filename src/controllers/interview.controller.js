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

    return res.status(200).json(report);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to generate report",
    });
  }
}

export default {
  createInterviewReport,
};