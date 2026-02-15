import multer from "multer";

const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.message.includes("Only PDF")) {
    return res.status(400).json({
      message: err.message,
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
