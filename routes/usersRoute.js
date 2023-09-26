import express from 'express';
import {
  loginUserControllers,
  registerUserControllers,
  updateShippingAddressControllers,
  userProfileControllers,
} from '../controllers/usersControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const userRouter = express.Router();

userRouter.post('/register', registerUserControllers);
userRouter.post('/login', loginUserControllers);
userRouter.get('/profile', isloggedIn, userProfileControllers);
userRouter.put(
  '/update/shipping',
  isloggedIn,
  updateShippingAddressControllers
);

export default userRouter;
