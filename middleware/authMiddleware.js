import { UnauthenticatedError, UnauthorizedError } from "../errors/customError.js";
import { verifyJWT } from "../utills/tokenUtils.js"; // Assumes you have a utility to verify JWT
import { BadRequestError } from '../errors/customError.js';

export const authenticateUser = async (req, res, next) => {
 
  const { token } = req.cookies;  // Extract token from cookies

  // Check if the token exists
  if (!token) {
    throw new UnauthenticatedError('Authentication invalid');  // Token not found
  }

  try {
    // Verify the JWT using the utility function
    const decoded = verifyJWT(token);

    // Attach the user data (from decoded token) to the request object

    req.user = decoded.userId;
    // req.user = decoded.ajs_anonymous_id;

    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    // If token verification fails or any error occurs
    throw new UnauthenticatedError('Authentication invalid');
  }
};
