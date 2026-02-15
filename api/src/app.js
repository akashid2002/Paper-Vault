import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorMiddleware.js";
import adminRoutes from "./routes/admin.routes.js";
import { globalLimiter } from "./config/rateLimit.js";

const app = express();

const allowedOrigins = process.env.FRONTEND_URL?.split(",") || [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

app.use(globalLimiter);

app.disable("x-powered-by");

app.get("/health", (req, res) => {
  res.json({ status: "API running sucessfully." });
});

app.use("/api", routes);
app.use("/api/admin", adminRoutes);

// error middleware last
app.use(errorHandler);

export default app;
