import express from "express";
import { getPapers, uploadPaper } from "../controllers/papers.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getPapers);
router.post("/", upload.single("file"), uploadPaper);

export default router;
