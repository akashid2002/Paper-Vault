import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import testRoutes from "./routes/test.routes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "API running sucessfully." });
});

app.use("/api", routes);

// app.use("/api/test", testRoutes);

// error middleware last
app.use(errorHandler);

export default app;
