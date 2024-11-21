/**
 * Frontend Logger Utility
 */

const logger = {
  info: (...args) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("[INFO]", ...args);
    }
  },

  error: (...args) => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[ERROR]", ...args);
    }
  },

  warn: (...args) => {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[WARN]", ...args);
    }
  },

  debug: (...args) => {
    if (process.env.NODE_ENV === "development") {
      console.debug("[DEBUG]", ...args);
    }
  },
};

export default logger;
