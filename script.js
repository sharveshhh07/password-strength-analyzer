const passwordInput = document.getElementById("password");
const toggleButton = document.getElementById("toggle");
const meterBar = document.getElementById("meterBar");
const strengthText = document.getElementById("strengthText");
const lengthStat = document.getElementById("lengthStat");
const scoreStat = document.getElementById("scoreStat");
const entropyStat = document.getElementById("entropyStat");
const feedback = document.getElementById("feedback");
const suggestion = document.getElementById("suggestion");

const commonPasswords = new Set([
  "password", "password123", "123456", "12345678", "123456789",
  "qwerty", "qwerty123", "admin", "letmein", "welcome",
  "abc123", "iloveyou", "monkey", "dragon", "football"
]);

function hasRepeatedPattern(password) {
  return /(.)\1{2,}/.test(password) || /1234|2345|3456|abcd|qwer/i.test(password);
}

function calculateEntropy(password) {
  if (!password) return 0;

  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^A-Za-z0-9]/.test(password)) pool += 33;

  return Math.round(password.length * Math.log2(Math.max(pool, 1)));
}

function analyze(password) {
  const lengthOK = password.length >= 12;
  const upperOK = /[A-Z]/.test(password);
  const lowerOK = /[a-z]/.test(password);
  const numberOK = /[0-9]/.test(password);
  const symbolOK = /[^A-Za-z0-9]/.test(password);
  const common = commonPasswords.has(password.toLowerCase());
  const pattern = hasRepeatedPattern(password);

  let score = 0;

  score += Math.min(password.length * 4, 40);
  if (upperOK) score += 10;
  if (lowerOK) score += 10;
  if (numberOK) score += 15;
  if (symbolOK) score += 15;
  if (lengthOK) score += 5;

  if (common) score -= 45;
  if (pattern) score -= 15;
  if (new Set(password).size < Math.max(3, password.length / 2)) score -= 10;

  score = Math.max(0, Math.min(100, score));

  updateCheck("lengthCheck", lengthOK, "At least 12 characters");
  updateCheck("upperCheck", upperOK, "Contains uppercase letters");
  updateCheck("lowerCheck", lowerOK, "Contains lowercase letters");
  updateCheck("numberCheck", numberOK, "Contains numbers");
  updateCheck("symbolCheck", symbolOK, "Contains symbols");
  updateCheck(
    "patternCheck",
    !common && !pattern,
    "Avoids repeated/common patterns"
  );

  let label = "Very weak";
  if (score >= 80) label = "Very strong";
  else if (score >= 60) label = "Strong";
  else if (score >= 40) label = "Medium";
  else if (score >= 20) label = "Weak";

  strengthText.textContent = `Strength: ${label}`;
  lengthStat.textContent = password.length;
  scoreStat.textContent = `${score}/100`;
  entropyStat.textContent = `${calculateEntropy(password)} bits`;
  meterBar.style.width = `${score}%`;

  const tips = [];
  if (!lengthOK) tips.push("make it at least 12 characters");
  if (!upperOK) tips.push("add an uppercase letter");
  if (!lowerOK) tips.push("add a lowercase letter");
  if (!numberOK) tips.push("add a number");
  if (!symbolOK) tips.push("add a symbol");
  if (common) tips.push("avoid common passwords");
  if (pattern) tips.push("avoid predictable sequences or repeated characters");

  feedback.textContent = tips.length
    ? `Tips: ${tips.join("; ")}.`
    : "Great! This password meets the main checks. For an important account, use a unique password stored in a trusted password manager.";
}

function updateCheck(id, passed, text) {
  const element = document.getElementById(id);
  element.textContent = `${passed ? "✓" : "○"} ${text}`;
}

function generatePassword(length = 18) {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZ" +
    "abcdefghijkmnopqrstuvwxyz" +
    "23456789" +
    "!@#$%^&*()-_=+";

  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  return Array.from(randomValues, value => chars[value % chars.length]).join("");
}

passwordInput.addEventListener("input", () => {
  analyze(passwordInput.value);
});

toggleButton.addEventListener("click", () => {
  const hidden = passwordInput.type === "password";
  passwordInput.type = hidden ? "text" : "password";
  toggleButton.textContent = hidden ? "Hide" : "Show";
});

document.getElementById("generate").addEventListener("click", () => {
  suggestion.value = generatePassword();
});

document.getElementById("copy").addEventListener("click", async () => {
  if (!suggestion.value) return;
  await navigator.clipboard.writeText(suggestion.value);
  document.getElementById("copy").textContent = "Copied!";
  setTimeout(() => {
    document.getElementById("copy").textContent = "Copy";
  }, 1200);
});
