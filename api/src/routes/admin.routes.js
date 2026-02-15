import express from "express";
import {
  getAllPapersAdmin,
  approvePaper,
  rejectPaper,
  deletePaper,
} from "../controllers/admin.controller.js";
import adminAuth from "../middleware/adminAuth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { adminPapersQuerySchema } from "../validators/admin.validator.js";
import { paperIdParamSchema } from "../validators/paper.validator.js";

const router = express.Router();

router.use(adminAuth);

router.get(
  "/papers",
  validate(adminPapersQuerySchema, "query"),
  getAllPapersAdmin,
);
router.patch(
  "/papers/:id/approve",
  validate(paperIdParamSchema, "params"),
  approvePaper,
);
router.patch(
  "/papers/:id/reject",
  validate(paperIdParamSchema, "params"),
  rejectPaper,
);
router.delete(
  "/papers/:id/delete",
  validate(paperIdParamSchema, "params"),
  deletePaper,
);
router.get("/validate", (req, res) => {
  res.json({ valid: true });
});

export default router;
