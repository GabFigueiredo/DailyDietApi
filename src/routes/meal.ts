import type { FastifyInstance } from "fastify";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists.js";
import z from "zod";
import { db } from "../database.js";

export function mealRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const zodSchema = z.object({
        name: z.string(),
        description: z.string(),
        dateAndtime: z.coerce.date(),
        isOnDiet: z.boolean(),
      });

      const bodyParse = zodSchema.safeParse(request.body);

      if (bodyParse.success === false) {
        return reply.status(406).send();
      }
      const userId = request.cookies.userId;

      if (!userId) {
        console.log("Não encontrou o cookie na criação da refeição")
        return reply.status(403).send();
      }

      const userExists = await db("users").where("id", userId);

      if (!userExists) {
        return reply.status(403).send();
      }

      const payload = bodyParse.data;

      await db("meals").insert({
        ...payload,
        user_id: userId,
      });

      return reply.status(201).send();
    }
  );
}
