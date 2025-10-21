// utils/passwordGenerator.js
function generatePassword({
  length = 12,
  includeLowercase = true,
  includeUppercase = true,
  includeNumbers = true,
  includeSymbols = true,
}) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";
  if (includeLowercase) chars += lowercase;
  if (includeUppercase) chars += uppercase;
  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;

  if (!chars.length) {
    throw new Error("Nenhum tipo de caractere selecionado");
  }

  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

module.exports = { generatePassword };
