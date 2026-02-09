import request from "supertest";
import app from "../app.js";

const ADMIN_KEY = process.env.ADMIN_API_KEY;

describe("Admin Papers API", () => {
  it("should fetch papers with pagination", async () => {
    const res = await request(app)
      .get("/api/admin/papers?page=1&limit=5")
      .set("x-admin-key", ADMIN_KEY);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("page");
    expect(res.body).toHaveProperty("total");
    expect(res.body).toHaveProperty("data");
  });

  it("should filter approved papers", async () => {
    const res = await request(app)
      .get("/api/admin/papers?status=approved")
      .set("x-admin-key", ADMIN_KEY);

    expect(res.statusCode).toBe(200);
  });

  it("should filter pending papers", async () => {
    const res = await request(app)
      .get("/api/admin/papers?status=pending")
      .set("x-admin-key", ADMIN_KEY);

    expect(res.statusCode).toBe(200);
  });
});
