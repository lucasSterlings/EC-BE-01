const LOGGERS = Object.freeze({
  LOG: console.log,
  ERROR: console.error,
});

const LOGGER_TYPE = Object.freeze({
  LOG: "LOG",
  ERROR: "ERROR",
});

function getLogger(loggerType) {
  return (...args) => LOGGERS[loggerType](...args);
}

function repeater(value) {
  return value + ".".repeat(30 - value.length) + ":";
}

function display(loggerType) {
  const logger = getLogger(loggerType);
  return (type, ...args) => {
    switch (String(type).toLowerCase()) {
      case "app":
        logger(repeater("App"), ...args);
        break;
      case "system":
        logger(repeater("System"), ...args);
        break;
      case "mongodb":
        logger(repeater("MongoDB"), ...args);
        break;
      case "request-error":
        logger(repeater("Request-Error"), ...args);
        break;
      default:
        logger(...args);
        break;
    }
  };
}

export default {
  log: display(LOGGER_TYPE.LOG),
  error: display(LOGGER_TYPE.ERROR),
};
