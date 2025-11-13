import { afterAll, beforeAll, beforeEach, describe, it } from "vitest";
import { execSync } from "node:child_process";
import request from "supertest";
import { app } from "../src/app.js";
import { db } from "../src/database.js";

describe("User Routes", () => {
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

  it("should create an user", async () => {
    await request(app.server)
      .post("/user")
      .send({
        email: "gab@gab.com",
        name: "gab",
        password: "senha",
      })
      .expect(201);
  });

  it("should throw an error when email already exists.", async () => {
    await db("users").insert({
      email: "gab@gab.com",
      name: "gab",
      password: "senha",
    });

    await request(app.server)
      .post("/user")
      .send({
        email: "gab@gab.com",
        name: "gab",
        password: "senha",
      })
      .expect(409);
  });
});
