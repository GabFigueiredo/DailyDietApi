import fastify from "fastify";
import { userRoutes } from "./routes/user.js";
import cookie from "@fastify/cookie";
import { mealRoutes } from "./routes/meal.js";

export const app = fastify();

app.register(cookie);

app.register(userRoutes, {
  prefix: "/user",
});

app.register(mealRoutes, {
  prefix: "/meal",
});
