import { FastifyTypedInstance } from "./common/types/FastifyInstance";

export function globalRoutes(instance: FastifyTypedInstance) {
  instance.route({
    url: "/",
    method: "GET",
    schema: { tags: ["users"] },
    handler: (req, reply) => reply.status(200),
  });
}
