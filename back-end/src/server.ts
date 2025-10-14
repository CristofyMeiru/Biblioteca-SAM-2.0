import fastifyCors from "@fastify/cors";
import fastify, { type FastifyInstance } from "fastify";
import fastifyBetterAuth from "fastify-better-auth";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { env } from "./config/env";
import { auth } from "./lib/auth";
import swaggerPlugin from "./plugins/swagger-plugin";

class Server {
  private readonly app: FastifyInstance;

  constructor() {
    this.app = fastify({ logger: false }).withTypeProvider<ZodTypeProvider>();
  }

  public async bootstrap(port: number): Promise<void> {
    try {
      await this.app.listen({ port });
      console.log(
        `Server is running:\n http://localhost:${port}\n http://localhost:${port}/docs`
      );
    } catch (error) {
      this.app.log.error(error);
      process.exit(1);
    }
  }

  public async setup(): Promise<void> {
    try {
      this.app.register(fastifyCors, {
        origin: env.FRONTEND_URL,
        credentials: true,
      });

      this.app.register(swaggerPlugin);

      this.app.register(fastifyBetterAuth, {
        auth: auth,
      });
    } catch (error) {
      throw error;
    }
  }
}

const server = new Server();
server.setup();
server.bootstrap(3333);
