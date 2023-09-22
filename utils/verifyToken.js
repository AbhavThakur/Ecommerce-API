import jsonwebtoken from 'jsonwebtoken';

/**
 * Verifies the given token using the provided JWT secret.
 *
 * @param {string} token - The token to be verified.
 * @return {boolean|object} Returns `false` if the token is invalid. Otherwise, returns the decoded token object.
 */
const verifyToken = (token) => {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return false;
    return decoded;
  });
};

export default verifyToken;
