import { ApiError } from "../utils/index.js";

export const errorHandler = async (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: "Internal Server error",
    });
  }
};
