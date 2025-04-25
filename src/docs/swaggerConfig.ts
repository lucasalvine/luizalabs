import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minha API",
      version: "1.0.0",
      description: "Documentação gerada automaticamente com Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/useCase/**/*.ts"], // Caminhos dos arquivos com comentários JSDoc
};

export const swaggerSpec = swaggerJsdoc(options);
