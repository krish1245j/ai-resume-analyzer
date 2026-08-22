import { Behavior, GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";



const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
});
const interviewReportSchema = z.object({
  matchScore: z.number().describe("A score between 0  to 100 indicating how well the candidate's profile matches the job description "),
  technicalQuestions: z.array(z.object({
    question: z.string().describe("The technical questions can be asked in the interview"),
    intention: z.string().describe("The intention of interviewer behind asking this question"),
    answer: z.string().describe("How to answer this question,what points to cover , what approach to follow")
  })).describe("Technical questions that can be asked in the interview along with there intention ans how to answer them"),
  behavioralQuestions: z.array(z.object({
    question: z.string().describe("The technical questions can be asked in the interview"),
    intention: z.string().describe("The intention of interviewer behind asking this question"),
    answer: z.string().describe("How to answer this question,what points to cover , what approach to follow")
  })).describe("Technical questions that can be asked in the interview along with there intention ans how to answer them"),
  skillGaps: z.array(z.object({
    skill: z.string().describe("The skill which candidate is lacking"),
    severity: z.enum(["low", "medium", "high"]),
  })).describe("List of skill gaps in the canditates profile along with their severity"),
  preparationPlan: z.array(z.object({
    day: z.number().describe("The day number in the prepration plan, starting with 1"),
    focus: z.string().describe("the main focus of this day in the prepration plan"),
    tasks: z.array(z.string()).describe("the list of tasks to be done in this day ")
  })).describe("A day wise prepration plan for the candidate to follow")
})
async function genrateInterviewReport({ resume, selfDescription, jobDescription}) {
  const prompt = `Generate an interview report STRICTLY in JSON format.

Follow this exact structure:
{
  "matchScore": number (0-100),
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": string[]
    }
  ]
}

Do NOT add any extra fields.
Do NOT return explanation.
Return ONLY valid JSON.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",

    }
  })
  const report = interviewReportSchema.parse(
    JSON.parse(response.text)
  );

  return report;

}

export default genrateInterviewReport; 
