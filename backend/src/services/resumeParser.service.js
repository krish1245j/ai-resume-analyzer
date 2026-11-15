import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

// Same cap the frontend applies to pasted resume text, so uploaded and
// pasted resumes reach the AI pipeline at an equivalent size.
export const MAX_RESUME_CHARS = 8000;
const MIN_MEANINGFUL_CHARS = 50;

export class ResumeParseError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = "ResumeParseError";
    this.status = status;
  }
}

const PDF_MAGIC = Buffer.from("%PDF-");
const ZIP_MAGIC = Buffer.from([0x50, 0x4b, 0x03, 0x04]); // DOCX is a ZIP container

function startsWith(buffer, magic) {
  return buffer.length >= magic.length && buffer.subarray(0, magic.length).equals(magic);
}

function cleanText(raw) {
  return String(raw || "")
    .replace(/\u0000/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

async function extractPdf(buffer) {
  // Fresh Buffer copy: pdf-parse hands the data to pdf.js, which may detach it.
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  try {
    const result = await parser.getText();
    return result.text;
  } catch (err) {
    if (err?.name === "PasswordException") {
      throw new ResumeParseError("This PDF is password-protected. Please remove the password and try again.");
    }
    throw new ResumeParseError("We couldn't read this PDF. It may be corrupted. Try re-exporting it or paste your resume text instead.");
  } finally {
    await parser.destroy().catch(() => {});
  }
}

async function extractDocx(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch {
    throw new ResumeParseError("We couldn't read this DOCX file. It may be corrupted or not a real Word document.");
  }
}

/**
 * Extracts plain text from an uploaded resume held in memory.
 * File type is decided from the real file signature, never the filename.
 */
export async function extractResumeText(file) {
  if (!file?.buffer || file.buffer.length === 0) {
    throw new ResumeParseError("The uploaded file is empty.");
  }

  let text;
  if (startsWith(file.buffer, PDF_MAGIC)) {
    text = await extractPdf(file.buffer);
  } else if (startsWith(file.buffer, ZIP_MAGIC)) {
    text = await extractDocx(file.buffer);
  } else {
    throw new ResumeParseError("The file content does not match a PDF or DOCX document.");
  }

  const cleaned = cleanText(text);
  if (cleaned.replace(/\s/g, "").length < MIN_MEANINGFUL_CHARS) {
    throw new ResumeParseError(
      "We couldn't find readable text in this file. It may be a scanned or image-based document. Please upload a text-based (OCR-processed) PDF, a DOCX, or paste your resume text instead."
    );
  }

  return cleaned.slice(0, MAX_RESUME_CHARS);
}
