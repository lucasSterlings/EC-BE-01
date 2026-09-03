function parseEnvInt(value, fallback) {
  const parsed = Number.parseInt(value || "");
  return Number.isNaN(parsed) ? fallback : parsed;
}

export default {
  parseEnvInt
}
