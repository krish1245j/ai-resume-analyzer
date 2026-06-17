import { useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [resume, setResume] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateReport() {
    try {
      setLoading(true);

      const res = await API.post("/interview/generate", {
        resume,
        selfDescription,
        jobDescription,
      });

      setReport(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to generate report");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>AI Interview Analyzer</h1>

      <textarea
        placeholder="Paste Resume Here"
        rows="15"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Tell us about yourself"
        rows="8"
        value={selfDescription}
        onChange={(e) => setSelfDescription(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Paste Job Description"
        rows="15"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={generateReport}>
        {loading ? "Generating..." : "Generate Interview Report"}
      </button>

      {report && (
        <>
          <hr />

          <h2>Match Score: {report.matchScore}%</h2>

          <h2>Technical Questions</h2>
          {report.technicalQuestions.map((q, i) => (
            <div key={i}>
              <h4>{q.question}</h4>
              <p><b>Intention:</b> {q.intention}</p>
              <p><b>Answer:</b> {q.answer}</p>
            </div>
          ))}

          <h2>Behavioral Questions</h2>
          {report.behavioralQuestions.map((q, i) => (
            <div key={i}>
              <h4>{q.question}</h4>
              <p><b>Intention:</b> {q.intention}</p>
              <p><b>Answer:</b> {q.answer}</p>
            </div>
          ))}

          <h2>Skill Gaps</h2>
          <ul>
            {report.skillGaps.map((gap, i) => (
              <li key={i}>
                {gap.skill} - {gap.severity}
              </li>
            ))}
          </ul>

          <h2>Preparation Plan</h2>

          {report.preparationPlan.map((day) => (
            <div key={day.day}>
              <h4>Day {day.day}</h4>
              <p>{day.focus}</p>

              <ul>
                {day.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Dashboard;  