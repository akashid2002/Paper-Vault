import multer from "multer";

// store file in memory (we upload to Supabase after)
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
