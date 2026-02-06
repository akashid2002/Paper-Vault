import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "API running 🚀" });
});

app.use("/api", routes);

// error middleware last
app.use(errorHandler);

export default app;
