import mongoose from 'mongoose';

export const Schema = mongoose.Schema;

export const Modal = (modalName, Schema) => mongoose.model(modalName, Schema);

/**
 * Generates a random string of specified length.
 *
 * @param {number} length - The length of the random string to generate.
 * @return {string} - The randomly generated string.
 */
export const randomText = (length) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * Generates a random number between 1000 and 9999.
 *
 * @return {number} The generated random number.
 */
export const randomNumber = () => {
  return Math.floor(1000 + Math.random() * 9000);
};
