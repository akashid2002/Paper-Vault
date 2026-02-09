const adminAuth = (req, res, next) => {
  const apiKey = req.headers["x-admin-key"];

  if (!apiKey) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ message: "Invalid Admin Access" });
  }

  next();
};

export default adminAuth;
