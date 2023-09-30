import express from 'express';

import {
  createColorControllers,
  deleteColorByIdControllers,
  getAllColorsControllers,
  getColorByIdControllers,
  updateColorByIdControllers,
} from '../controllers/colorControllers.js';
import isAdmin from '../middlewares/isAdmin.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const colorRouter = express.Router();

colorRouter.post('/', isloggedIn, isAdmin, createColorControllers);
colorRouter.get('/', getAllColorsControllers);
colorRouter.get('/:id', getColorByIdControllers);
colorRouter.put('/:id', isloggedIn, isAdmin, updateColorByIdControllers);
colorRouter.delete(
  '/:id/delete',
  isloggedIn,
  isAdmin,
  deleteColorByIdControllers
);

export default colorRouter;
