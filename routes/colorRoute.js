import express from 'express';

import {
  createColorControllers,
  deleteColorByIdControllers,
  getAllColorsControllers,
  getColorByIdControllers,
  updateColorByIdControllers,
} from '../controllers/colorControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const colorRouter = express.Router();

colorRouter.post('/', isloggedIn, createColorControllers);
colorRouter.get('/', getAllColorsControllers);
colorRouter.get('/:id', getColorByIdControllers);
colorRouter.put('/:id', isloggedIn, updateColorByIdControllers);
colorRouter.delete('/:id/delete', isloggedIn, deleteColorByIdControllers);

export default colorRouter;
