import errorResponse from "./error-response.js";

function getValidatorMiddleware(validator) {
  return (req, res, next) => {
    const { error, value } = validator?.validate(req.body || {}, {
      abortEarly: true,
      stripUnknown: true,
    }) || {
      error: new Error("Failed to Validate."),
      value: undefined,
    };

    if (error) {
      return next(errorResponse.Throw.BadRequest(error.message));
    }
    req.body = value;
    return next();
  };
}

export default {
  Get: {
    Middleware: getValidatorMiddleware,
  },
};
