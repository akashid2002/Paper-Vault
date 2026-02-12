const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAllPapers() {
  const res = await fetch(`${API_URL}/papers`, {
    next: { revalidate: 60 },
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

export function uploadPaper(formData, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `${API_URL}/papers`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error("Upload failed"));
      }
    };

    xhr.onerror = () => reject(new Error("Upload failed"));

    xhr.send(formData);
  });
}
