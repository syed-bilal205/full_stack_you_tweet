import jwt from "jsonwebtoken";
import { asyncHandler, ApiError } from "../utils/index.js";
import User from "../models/user.model.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log("token" + token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          console.error("JWT verification failed:", err);
          throw new ApiError(403, "Unauthorized");
        }
        const user = await User.findById(decoded._id);
        // console.log(user);

        if (!user) {
          throw new ApiError(404, "User not found");
        }

        req.user = user;
        next();
      }
    );
  } catch (error) {
    console.log("JWT verification failed:", error);
    throw new ApiError(401, "Unauthorized");
  }
});
