import type { FastifyInstance } from "fastify";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists.js";
import z from "zod";
import { db } from "../database.js";
import { GetParamsId } from "../util/get-params-userId.js";

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

      const userExists = await db("users").where("id", userId).first();

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

  app.put(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const bodySchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        dateAndtime: z.coerce.date().optional(),
        isOnDiet: z.boolean().optional(),
      });

      const bodyParse = bodySchema.safeParse(request.body);

      if (bodyParse.success === false) {
        return reply.status(406).send();
      }

      const payload = bodyParse.data;
      const userId = request.cookies.userId;
      const mealId = GetParamsId(request, reply);

      const updated = await db("meals")
        .where({ id: mealId, user_id: userId })
        .update(payload);

      if (updated === 0) {
        return reply.status(400).send();
      }

      reply.status(200).send();
    }
  );

  app.delete(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const userId = request.cookies.userId;
      const mealId = GetParamsId(request, reply);

      const deleted = await db("meals")
        .where({ id: mealId, user_id: userId })
        .delete();

      if (deleted === 0) {
        return reply.status(400).send();
      }

      reply.status(200).send();
    }
  );

  // Listar todas as refeições de um usuário
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const userId = request.cookies.userId;

      const meals = await db("meals").where({ user_id: userId });

      reply.status(200).send(meals);
    }
  );

  // Listar Refeição por ID
  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const mealId = GetParamsId(request, reply);
      const userId = request.cookies.userId;

      const meal = await db("meals")
        .where({ id: mealId, user_id: userId })
        .first();

      reply.status(200).send(meal);
    }
  );

  // Listar as métricas do usuário
  app.get(
    "/metrics",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const userId = request.cookies.userId;

      const mealQuantity = await db("meals")
        .where({ user_id: userId })
        .count({ count: "*" });
      const mealsOnDietQuantity = await db("meals")
        .where({ user_id: userId, isOnDiet: true })
        .count({ count: "*" });

      const mealsOutDiet = Number(mealQuantity) - Number(mealsOnDietQuantity);

      reply.status(200).send({
        mealQuantity,
        mealsOnDietQuantity,
        mealsOutDiet,
      });
    }
  );
}
