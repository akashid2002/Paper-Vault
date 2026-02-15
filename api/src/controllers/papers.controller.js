import supabase from "../config/supabaseClient.js";
import { uploadFileToStorage } from "../services/storage.service.js";
import { v4 as uuidv4 } from "uuid";

export const uploadPaper = async (req, res, next) => {
  try {
    const { course, semester, subject, exam_session, year } = req.validatedBody;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        message: "Only PDF, JPG and PNG files are allowed",
      });
    }

    const maxSize = 5 * 1024 * 1024;

    if (req.file.size > maxSize) {
      return res.status(400).json({
        message: "File size must be less than 5MB",
      });
    }

    const extension = req.file.originalname.split(".").pop();
    const safeFileName = `${Date.now()}-${uuidv4()}.${extension}`;

    // upload file to storage
    const fileUrl = await uploadFileToStorage(req.file, safeFileName);

    // save metadata in DB
    const { data, error } = await supabase.from("papers").insert([
      {
        course,
        semester,
        subject,
        exam_session,
        year,
        file_url: fileUrl,
        approved: false,
      },
    ]);

    if (error) throw error;

    res.json({ message: "Paper uploaded successfully." });
  } catch (err) {
    next(err);
  }
};

export const getPapers = async (req, res, next) => {
  try {
    const { course, semester, subject } = req.validatedQuery;

    // let query = supabase.from("papers").select("*").eq("approved", true);
    let query = supabase.from("papers").select("*");

    if (course) query = query.eq("course", course);
    if (semester) query = query.eq("semester", semester);
    if (subject) query = query.eq("subject", subject);

    const { data, error } = await query;

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
};

// Get ppaper by ID (for both users and admins, but users will only see approved papers in the list endpoint, so this is mostly for admins or direct access)
export const getPaperById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("papers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    next(err);
  }
};
