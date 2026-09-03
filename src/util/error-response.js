import { Http } from "../config/config.js";

function generateThrowErrorResponse(statusCode) {
  return (message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  };
}

export default {
  Throw: {
    Conflict: generateThrowErrorResponse(Http.STATUS.CONFLICT),
    Unauthorized: generateThrowErrorResponse(Http.STATUS.UNAUTHORIZED),
    NotFound: generateThrowErrorResponse(Http.STATUS.NOT_FOUND),
    BadRequest: generateThrowErrorResponse(Http.STATUS.BAD_REQUEST),
  },
};
