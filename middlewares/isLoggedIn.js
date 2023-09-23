import { getTokenFromHeader, verifyToken } from '../utils/index.js';

/**
 * Middleware function to check if a user is logged in.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {Error} Invalid/Expired token, please login again.
 */
export const isloggedIn = (req, res, next) => {
  const token = getTokenFromHeader(req);

  const decodedUser = verifyToken(token);

  if (!decodedUser) {
    throw new Error('Invalid/Expired token,please login again');
  } else {
    req.userAuthId = decodedUser?.id;
    next();
  }
};
