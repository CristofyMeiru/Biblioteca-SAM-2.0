import { FastifyTypedInstance } from "@/common/types/FastifyInstance";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyPlugin from "fastify-plugin";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

async function swaggerPluggin(app: FastifyTypedInstance): Promise<void> {
  try {
    await app.register(fastifySwagger, {
      openapi: {
        info: {
          title: "API - Docs",
          description: "Documentação da API",
          version: "1.0.0",
        },
      },
      transform: jsonSchemaTransform,
    });

    const theme = new SwaggerTheme();
    const darkThemeCss = theme.getBuffer(SwaggerThemeNameEnum.DARK);

    await app.register(fastifySwaggerUI, {
      routePrefix: "/docs",
      uiConfig: { docExpansion: "full", deepLinking: false },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      theme: { css: [{ filename: "dark-theme", content: darkThemeCss }] },
    });
  } catch (error) {
    console.log(error);
  }
}

export default fastifyPlugin(swaggerPluggin);
