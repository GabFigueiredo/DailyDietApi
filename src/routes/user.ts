import type { FastifyInstance } from "fastify";
import z from "zod";
import { db } from "../database.js";
import { randomUUID } from "crypto";

export function userRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const zodSchema = z.object({
      email: z.string(),
      name: z.string(),
      password: z.string(),
    });

    const bodyParse = zodSchema.safeParse(request.body);

    if (bodyParse.success === false) {
      return reply.status(406).send();
    }

    const payload = bodyParse.data;

    const existingUser = await db("users")
      .where("email", payload.email)
      .first();

      // Verifica se email já existe
    if (existingUser) {
      return reply.status(409).send();
    }

    const newUserId = randomUUID();

    await db("users").insert({
      id: newUserId,
      ...payload,
    });

    if (!request.cookies.userId) {
      reply.cookie("userId", newUserId, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
    }
    return reply.status(201).send();
  });
}
