import jsonwebtoken from 'jsonwebtoken';

/**
 * Generates a token for the given ID.
 *
 * @param {number} id - The ID to generate the token for.
 * @return {string} The generated token.
 */
const generateToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
};

export default generateToken;
