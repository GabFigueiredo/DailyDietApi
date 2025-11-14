import { type FastifyReply, type FastifyRequest } from "fastify";

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sessionUserId = request.cookies;

  console.log("COOKIE:", sessionUserId); 

  if (!sessionUserId) {
    return reply.status(432).send({
      error: "Unauthorized.",
    });
  }
}
