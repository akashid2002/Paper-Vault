import supabase from "../config/supabaseClient.js";

export const testDB = async (req, res) => {
  const { data, error } = await supabase.from("papers").select("*");

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
};
