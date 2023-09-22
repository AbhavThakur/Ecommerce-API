/**
 * Retrieves a token from the authorization header of the request.
 *
 * @param {object} req - The request object.
 * @return {string} The token extracted from the authorization header, or 'No token found' if no token is found.
 */
const getTokenFromHeader = (req) => {
  const token = req?.headers?.authorization?.split(' ')[1];
  if (token === undefined) {
    return 'No token found ';
  } else {
    return token;
  }
};

export default getTokenFromHeader;
