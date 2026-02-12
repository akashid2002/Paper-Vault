import express from "express";
import {
  getPaperById,
  getPapers,
  uploadPaper,
} from "../controllers/papers.controller.js";
import upload from "../middleware/upload.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { uploadPaperSchema } from "../validators/paper.validator.js";
import { papersQuerySchema } from "../validators/query.validator.js";

const router = express.Router();

router.get("/", validate(papersQuerySchema, "query"), getPapers);
router.post(
  "/",
  upload.single("file"),
  validate(uploadPaperSchema),
  uploadPaper,
);
router.get("/:id", getPaperById);

export default router;
