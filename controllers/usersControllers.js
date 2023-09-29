import bcrypt from 'bcryptjs/dist/bcrypt.js';
import asyncHandler from 'express-async-handler';

import { UserModal } from '../model/index.js';
import { generateToken } from '../utils/index.js';

/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise} A Promise that resolves to void.
 */
export const registerUserControllers = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const userExists = await UserModal.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await UserModal.create({
    fullName,
    email,
    password: hashPassword,
  });

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

  const checkUser = await UserModal.findOne({ email });
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

// get user profile
// ENDPOINT - GET /api/v1/users/profile
export const userProfileControllers = asyncHandler(async (req, res) => {
  const user = await UserModal.findById(req.userAuthId).populate('orders');
  res.status(200).json({
    status: 'success',
    message: 'User profile',
    data: user,
  });
});

// update shipping address
// ENDPOINT - PUT /api/v1/users/update/shipping
export const updateShippingAddressControllers = asyncHandler(
  async (req, res) => {
    const {
      firstName,
      lastName,
      address,
      city,
      postalCode,
      country,
      province,
    } = req.body;

    const user = await UserModal.findByIdAndUpdate(
      req.userAuthId,
      {
        shippingAddress: {
          firstName,
          lastName,
          address,
          city,
          postalCode,
          country,
          province,
        },
        hasShippingAddress: true,
      },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      message: 'Shipping address updated',
      data: user,
    });
  }
);
