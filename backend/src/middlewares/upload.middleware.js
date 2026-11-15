import multer from "multer";
import path from "path";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED = {
  ".pdf": ["application/pdf"],
  ".docx": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
};
// Some browsers/OSes send a generic type for valid files; magic bytes are
// verified later in the parser, so these are tolerated here.
const GENERIC_MIME = ["application/octet-stream", "application/zip", "application/x-zip-compressed"];

const upload = multer({
  storage: multer.memoryStorage(), // nothing is written to disk
  limits: { fileSize: MAX_FILE_SIZE, files: 1, fields: 10, parts: 12 },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const mimes = ALLOWED[ext];
    const mimeOk = mimes && (mimes.includes(file.mimetype) || GENERIC_MIME.includes(file.mimetype));
    if (!mimeOk) {
      const err = new Error("Unsupported file type. Please upload a PDF or DOCX file.");
      err.code = "UNSUPPORTED_FILE_TYPE";
      return cb(err);
    }
    cb(null, true);
  },
}).single("resumeFile");

// Wraps multer so every upload problem becomes a clean JSON error.
// JSON (non-multipart) requests pass straight through untouched.
function uploadResume(req, res, next) {
  upload(req, res, (err) => {
    if (!err) return next();
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ message: "File is too large. Maximum size is 5 MB." });
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE" || err.code === "LIMIT_FILE_COUNT") {
        return res.status(400).json({ message: "Please upload a single PDF or DOCX file." });
      }
      return res.status(400).json({ message: "Invalid upload request." });
    }
    if (err.code === "UNSUPPORTED_FILE_TYPE") {
      return res.status(415).json({ message: err.message });
    }
    console.error("Upload error:", err);
    return res.status(400).json({ message: "Could not process the uploaded file." });
  });
}

export default { uploadResume };
