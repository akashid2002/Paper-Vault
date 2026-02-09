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
    const { id } = req.params;
    console.log("Approving paper with id:", id);

    const { error } = await supabaseAdmin
      .from("papers")
      .update({ approved: true })
      .eq("id", id);

    if (error) throw error;

    res.json({ message: `Paper with id ${id} approved ✅` });
  } catch (err) {
    next(err);
  }
};

// REJECT paper (soft delete by setting approved to false, or you can choose to hard delete by actually deleting the record)
export const rejectPaper = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from("papers")
      .update({ approved: false })
      .eq("id", id);

    if (error) throw error;

    res.json({ message: `Paper with id ${id} rejected ❌` });
  } catch (err) {
    next(err);
  }
};

// DELETE (delete)
export const deletePaper = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin.from("papers").delete().eq("id", id);

    if (error) throw error;

    res.json({ message: `Paper with id ${id} deleted` });
  } catch (err) {
    next(err);
  }
};
