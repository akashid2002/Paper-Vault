import supabase from "../config/supabaseClient.js";
import { uploadFileToStorage } from "../services/storage.service.js";

export const uploadPaper = async (req, res, next) => {
  try {
    const { course, semester, subject, exam_session, year } = req.validatedBody;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // upload file to storage
    const fileUrl = await uploadFileToStorage(req.file);

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
