import express from 'express';

import {
  createBrandControllers,
  deleteBrandByIdControllers,
  getAllBrandsControllers,
  getBrandByIdControllers,
  updateBrandByIdControllers,
} from '../controllers/brandControllers.js';
import isAdmin from '../middlewares/isAdmin.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const brandRouter = express.Router();

brandRouter.post('/', isloggedIn, isAdmin, createBrandControllers);
brandRouter.get('/', getAllBrandsControllers);
brandRouter.get('/:id', getBrandByIdControllers);
brandRouter.put('/:id', isloggedIn, isAdmin, updateBrandByIdControllers);
brandRouter.delete(
  '/:id/delete',
  isloggedIn,
  isAdmin,
  deleteBrandByIdControllers
);

export default brandRouter;
