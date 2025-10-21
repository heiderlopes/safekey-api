// server.js
const express = require("express");
const cors = require("cors");
const { generatePassword } = require("./utils/passwordGenerator");
const setupSwagger = require("./swagger");

const app = express();
app.use(cors());
app.use(express.json());

// 🧩 Configuração do Swagger
setupSwagger(app);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Verifica se a API está online
 *     responses:
 *       200:
 *         description: Retorna uma mensagem simples de status
 */
app.get("/", (req, res) => {
  res.send("🔐 Password Generator API is running!");
});

/**
 * @swagger
 * /generate:
 *   post:
 *     summary: Gera uma nova senha com base nas configurações enviadas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               length:
 *                 type: integer
 *                 example: 12
 *               includeLowercase:
 *                 type: boolean
 *                 example: true
 *               includeUppercase:
 *                 type: boolean
 *                 example: true
 *               includeNumbers:
 *                 type: boolean
 *                 example: true
 *               includeSymbols:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Senha gerada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 password:
 *                   type: string
 *                   example: "aD8#kfT9sG@pZ1wQ"
 *       400:
 *         description: Erro ao gerar senha
 */
app.post("/generate", (req, res) => {
  try {
    const {
      length,
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols,
    } = req.body;

    const password = generatePassword({
      length: length || 12,
      includeLowercase: includeLowercase ?? true,
      includeUppercase: includeUppercase ?? true,
      includeNumbers: includeNumbers ?? true,
      includeSymbols: includeSymbols ?? true,
    });

    res.json({ password });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🚀 Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
