import express from "express";
import { getPapers, uploadPaper } from "../controllers/papers.controller.js";

const router = express.Router();

router.get("/", getPapers);
router.post("/", uploadPaper);

export default router;
