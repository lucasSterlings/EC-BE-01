import logger from "./logger.js";

async function conductTest(
  testNumber,
  testName,
  testFunction,
  showResult = false,
) {
  try {
    const result = await testFunction();
    logger.log(
      "system",
      `CONDUCTING TEST [${testNumber}]`,
      testName,
      "RESULT:",
      showResult ? result : !!result ? '"success"' : '"failure"',
    );
    return result;
  } catch (error) {
    logger.log(
      "system",
      `CONDUCTING TEST [${testNumber}] |`,
      "Failure cause:",
      error.message,
    );
    return "failure";
  }
}

export default {
  conductTest,
};
