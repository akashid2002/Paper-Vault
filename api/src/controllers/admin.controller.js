import supabaseAdmin from "../config/supabaseAdmin.js";

export const getAllPapersAdmin = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || "all";

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabaseAdmin
      .from("papers")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    // filter by approval status
    if (status === "approved") {
      query = query.eq("approved", true);
    } else if (status === "pending") {
      query = query.eq("approved", false);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    res.json({
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      data,
    });
  } catch (err) {
    next(err);
  }
};

// APPROVE paper
export const approvePaper = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;

    const { error } = await supabaseAdmin
      .from("papers")
      .update({ approved: true })
      .eq("id", id);

    if (error) throw error;

    res.json({ message: `Paper with id ${id} approved successfully.` });
  } catch (err) {
    next(err);
  }
};

// REJECT paper (soft delete by setting approved to false, or you can choose to hard delete by actually deleting the record)
export const rejectPaper = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;

    const { error } = await supabaseAdmin
      .from("papers")
      .update({ approved: false })
      .eq("id", id);

    if (error) throw error;

    res.json({ message: `Paper with id ${id} rejected successfully.` });
  } catch (err) {
    next(err);
  }
};

// DELETE (delete)
export const deletePaper = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;

    const { data: paper, error: fetchError } = await supabaseAdmin
      .from("papers")
      .select("file_url")
      .eq("id", id)
      .single();

    if (fetchError || !paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    const filePath = paper.file_url.split(
      "/storage/v1/object/public/papers/",
    )[1];

    if (filePath) {
      const { error: storageError } = await supabaseAdmin.storage
        .from("papers")
        .remove([filePath]);

      if (storageError) {
        return res.status(500).json({
          message: "Failed to delete file from storage",
        });
      }
    }

    const { error: deleteError } = await supabaseAdmin
      .from("papers")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    res.json({ message: `Paper with id ${id} deleted` });
  } catch (err) {
    next(err);
  }
};
