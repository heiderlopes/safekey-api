// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Password Generator API",
      version: "1.0.0",
      description: "API simples para geração de senhas seguras",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
    ],
  },
  apis: ["./server.js"], // Caminho para as rotas documentadas
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📚 Swagger disponível em: http://localhost:3000/docs");
}

module.exports = setupSwagger;
