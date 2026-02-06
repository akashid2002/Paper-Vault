import express from "express";
import papersRoutes from "./papers.routes.js";

const router = express.Router();

router.use("/papers", papersRoutes);

export default router;
