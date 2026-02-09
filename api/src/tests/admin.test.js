import request from "supertest";
import app from "../app.js";

const ADMIN_KEY = process.env.ADMIN_API_KEY;

describe("Admin Authentication", () => {
  it("should block access without admin key", async () => {
    const res = await request(app).get("/api/admin/papers");
    expect(res.statusCode).toBe(401);
  });

  it("should allow access with admin key", async () => {
    const res = await request(app)
      .get("/api/admin/papers")
      .set("x-admin-key", ADMIN_KEY);

    expect(res.statusCode).toBe(200);
  });
});
