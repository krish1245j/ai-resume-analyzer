import { useRef, useState } from "react";
import {
  FiFileText,
  FiUploadCloud,
  FiCheckCircle,
  FiX,
  FiRefreshCw,
  FiAlertCircle,
  FiEdit3,
} from "react-icons/fi";
import Textarea from "./Textarea";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXT = [".pdf", ".docx"];

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function validateResumeFile(file) {
  const name = file.name.toLowerCase();
  if (!ALLOWED_EXT.some((ext) => name.endsWith(ext))) {
    return "Unsupported file type. Please upload a PDF or DOCX file.";
  }
  if (file.size === 0) return "This file is empty.";
  if (file.size > MAX_FILE_SIZE) return "File is too large. Maximum size is 5 MB.";
  return null;
}

/**
 * Resume field with two modes: upload a PDF/DOCX, or paste text.
 * The parent owns `resume` (text) and `file` so the existing Dashboard
 * state and API flow stay in one place.
 */
function ResumeInput({ resume, onResumeChange, file, onFileChange, loading = false, serverError = "" }) {
  const [mode, setMode] = useState(file ? "upload" : "paste");
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState("");
  const inputRef = useRef(null);

  const error = localError || serverError;

  function pickFile(selected) {
    if (!selected) return;
    const problem = validateResumeFile(selected);
    if (problem) {
      setLocalError(problem);
      return;
    }
    setLocalError("");
    onFileChange(selected);
  }

  function removeFile() {
    setLocalError("");
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    if (loading) return;
    if (e.dataTransfer.files.length > 1) {
      setLocalError("Please upload a single file.");
      return;
    }
    pickFile(e.dataTransfer.files[0]);
  }

  const tab = (id, label, Icon) => (
    <button
      type="button"
      onClick={() => setMode(id)}
      disabled={loading}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed ${
        mode === id
          ? "bg-cta-gradient text-white shadow-glow"
          : "text-ink-faint hover:text-ink hover:bg-white/5"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center gap-2">
        <FiFileText className="h-4 w-4 text-brand-violetLight" />
        <span className="text-sm font-medium text-ink-dim">Resume</span>
      </div>

      <div className="mb-3 flex gap-1 rounded-xl border border-surface-borderStrong bg-surface-light/80 p-1">
        {tab("upload", "Upload file", FiUploadCloud)}
        {tab("paste", "Paste text", FiEdit3)}
      </div>

      {mode === "paste" ? (
        <Textarea
          placeholder="Paste your resume here"
          rows={9}
          maxLength={8000}
          value={resume}
          onChange={(e) => onResumeChange(e.target.value)}
        />
      ) : (
        <div>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={(e) => pickFile(e.target.files[0])}
          />

          {!file ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`flex min-h-[15rem] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
                dragging
                  ? "border-brand-violetLight bg-brand-violet/10"
                  : "border-surface-borderStrong bg-surface-light/60"
              }`}
            >
              <FiUploadCloud className="h-9 w-9 text-brand-violetLight" />
              <div>
                <p className="text-sm font-medium text-ink">Drag &amp; drop your resume here</p>
                <p className="mt-1 text-xs text-ink-faint">PDF or DOCX, up to 5 MB</p>
              </div>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-xl border border-surface-borderStrong bg-surface-light px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-brand-violetLight/60"
              >
                Browse files
              </button>
            </div>
          ) : (
            <div className="flex min-h-[15rem] flex-col items-center justify-center gap-4 rounded-xl border border-surface-borderStrong bg-surface-light/60 p-6 text-center">
              <div className="flex w-full items-center gap-3 rounded-xl border border-surface-border bg-canvas-soft/60 p-3 text-left">
                <FiFileText className="h-8 w-8 shrink-0 text-brand-cyan" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink" title={file.name}>
                    {file.name}
                  </p>
                  <p className="font-mono text-xs text-ink-faint">{formatSize(file.size)}</p>
                </div>
                {loading ? (
                  <span className="h-5 w-5 shrink-0 rounded-full border-2 border-white/20 border-t-brand-violetLight animate-spin" />
                ) : (
                  <FiCheckCircle className="h-5 w-5 shrink-0 text-signal-success" />
                )}
              </div>
              <p className={`text-xs ${loading ? "text-ink-faint" : "text-signal-success"}`}>
                {loading ? "Reading your resume…" : "Resume ready. It will be analyzed when you generate the report."}
              </p>
              {!loading && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-surface-borderStrong px-3 py-1.5 text-xs text-ink-dim transition-colors hover:text-ink"
                  >
                    <FiRefreshCw className="h-3.5 w-3.5" /> Replace
                  </button>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-surface-borderStrong px-3 py-1.5 text-xs text-ink-dim transition-colors hover:text-signal-danger"
                  >
                    <FiX className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-3 flex items-start gap-2 rounded-lg bg-signal-dangerBg p-3 text-xs text-signal-danger"
        >
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default ResumeInput;
