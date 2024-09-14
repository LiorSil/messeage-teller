// logger.ts
const isDevelopment = process.env.NODE_ENV === "development";

export const logger = {
  info: (...args: any[]) => isDevelopment && console.log("[INFO]:", ...args),
  warn: (...args: any[]) => isDevelopment && console.warn("[WARN]:", ...args),
  error: (...args: any[]) => console.error("[ERROR]:", ...args),
};
