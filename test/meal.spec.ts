import { execSync } from "child_process";
import { beforeEach, describe } from "node:test";
import { afterAll, beforeAll, it } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("Meal Routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");
  });

  it("should create a meal", async () => {
    await request(app.server).post("/user").send({
      email: "gab@gab.com",
      name: "gab",
      password: "senha",
    });

    await request(app.server)
      .post("/meal")
      .send({
        name: "Steak",
        description: "A Delicious meal",
        dateAndtime: "2025-02-01T14:30:00Z",
        isOnDiet: true,
      })
      .expect(201);
  });
});
