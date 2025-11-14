import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export function GetParamsId(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.uuid(),
  });

  const paramParse = paramsSchema.safeParse(request.params);

  if (paramParse.success === false) {
    return reply.status(406).send();
  }

  return paramParse.data;
}
