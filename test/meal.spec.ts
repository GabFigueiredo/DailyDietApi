import { execSync } from "child_process";
import { afterAll, beforeAll, beforeEach, describe, it } from "vitest";
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

  it.only("should create a meal", async () => {
    const response = await request(app.server)
      .post("/user")
      .send({
        email: "gab@gab.com",
        name: "gab",
        password: "senha",
      })
      .expect(201);

    console.log(response.get("Set-Cookie"));

    const cookies = response.get("Set-Cookie");
    await request(app.server)
      .post("/meal")
      .set("Cookie", cookies ?? [])
      .send({
        name: "Steak",
        description: "A Delicious meal",
        dateAndtime: "2025-02-01T14:30:00Z",
        isOnDiet: true,
      })
      .expect(201);
  });
});
