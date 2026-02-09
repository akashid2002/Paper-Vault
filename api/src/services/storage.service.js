import supabase from "../config/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

export const uploadFileToStorage = async (file) => {
  const fileName = `${uuidv4()}-${file.originalname}`;

  const { data, error } = await supabase.storage
    .from("papers")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from("papers")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
};
