import request from "supertest";
import app from "../app.js";

describe("Public Papers API", () => {
  it("should fetch approved papers", async () => {
    const res = await request(app).get("/api/papers");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should support filters", async () => {
    const res = await request(app).get("/api/papers?course=Engineering");

    expect(res.statusCode).toBe(200);
  });
});
