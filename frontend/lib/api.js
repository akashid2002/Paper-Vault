const API_URL = process.env.API_URL;

export async function fetchAllPapers() {
  const res = await fetch(`${API_URL}/papers`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch papers");

  return res.json();
}

export async function fetchPaperById(id) {
  const res = await fetch(`${API_URL}/papers/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch paper");

  return res.json();
}
