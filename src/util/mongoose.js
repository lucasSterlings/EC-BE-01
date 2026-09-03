import mongoose from "mongoose";
import errorResponse from "./error-response.js";
function validId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw errorResponse.Throw.Unauthorized("Invalid account ID.");
  }
}

export default {
  validId,
};
