import { z } from "zod";
import ollama from "ollama";

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
async function genrateInterviewReport({ resume, selfDescription, jobDescription }) {
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

Rules:
- Every question object MUST have non-empty "question", "intention", and "answer" string values.
- Do NOT include placeholder, empty, or partial objects. If you cannot fully complete an entry, omit it entirely rather than including it incomplete.
- Do NOT add any extra fields.
- Do NOT return explanation.
- Return ONLY valid JSON.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;
    const response = await ollama.chat({
        model: "qwen3:4b",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        format: "json",
        think: false,
        keep_alive: "30m",              // 👈 added — keeps model warm between requests
        options: {
            num_predict: 2048,          // 👈 down from 4096
            num_ctx: 4096
        }
    })
    console.log("QWEN RAW RESPONSE:");
    console.log(response.message.content);
    let parsedReport;

    try {
        parsedReport = JSON.parse(response.message.content);
    } catch (error) {
        console.error("INVALID JSON FROM QWEN:");
        console.error(response.message.content);
        throw error;
    }

    // Local models occasionally hallucinate malformed/empty filler entries
    // in arrays. Strip those out instead of letting one bad entry fail
    // the whole report.
    function isNonEmptyString(v) {
        return typeof v === "string" && v.trim().length > 0;
    }

    if (Array.isArray(parsedReport.technicalQuestions)) {
        parsedReport.technicalQuestions = parsedReport.technicalQuestions.filter(
            (q) => isNonEmptyString(q?.question) && isNonEmptyString(q?.intention) && isNonEmptyString(q?.answer)
        );
    }

    if (Array.isArray(parsedReport.behavioralQuestions)) {
        parsedReport.behavioralQuestions = parsedReport.behavioralQuestions.filter(
            (q) => isNonEmptyString(q?.question) && isNonEmptyString(q?.intention) && isNonEmptyString(q?.answer)
        );
    }

    if (Array.isArray(parsedReport.skillGaps)) {
        parsedReport.skillGaps = parsedReport.skillGaps.filter(
            (g) => isNonEmptyString(g?.skill) && ["low", "medium", "high"].includes(g?.severity)
        );
    }

    if (Array.isArray(parsedReport.preparationPlan)) {
        parsedReport.preparationPlan = parsedReport.preparationPlan.filter(
            (p) => typeof p?.day === "number" && isNonEmptyString(p?.focus) && Array.isArray(p?.tasks) && p.tasks.length > 0
        );
    }

    const report = interviewReportSchema.parse(parsedReport);

    return report;
}

export default genrateInterviewReport;