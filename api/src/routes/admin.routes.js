import express from "express";
import {
  getAllPapersAdmin,
  approvePaper,
  rejectPaper,
  deletePaper,
} from "../controllers/admin.controller.js";
import adminAuth from "../middleware/adminAuth.middleware.js";

const router = express.Router();

router.use(adminAuth);

router.get("/papers", getAllPapersAdmin);
router.patch("/papers/:id/approve", approvePaper);
router.patch("/papers/:id/reject", rejectPaper);
router.delete("/papers/:id/delete", deletePaper);

export default router;
