import bcrypt from 'bcryptjs/dist/bcrypt.js';
import asyncHandler from 'express-async-handler';
import User from '../model/User.js';
import generateToken from '../utils/generateToken.js';
import getTokenFromHeader from '../utils/getTokenFromHeader.js';
import verifyToken from '../utils/verifyToken.js';

/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A Promise that resolves to void.
 */
export const registerUserControllers = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ fullName, email, password: hashPassword });

  res.status(201).json({
    status: 'success',
    message: 'User Registered successfully',
    data: user,
  });
});

/**
 * Login user controllers.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The function does not return anything.
 */
export const loginUserControllers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await User.findOne({ email });
  if (checkUser && (await bcrypt.compare(password, checkUser.password))) {
    return res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      data: checkUser,
      token: generateToken(checkUser._id),
    });
  } else {
    throw new Error();
  }
});

export const userProfileControllers = asyncHandler(async (req, res) => {
  const token = getTokenFromHeader(req);
  const verified = verifyToken(token);
  console.log(verified);
  res.status(200).json({
    status: 'success',
    message: 'User profile',
  });
});