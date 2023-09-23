import express from 'express';

import {
  createBrandControllers,
  deleteBrandByIdControllers,
  getAllBrandsControllers,
  getBrandByIdControllers,
  updateBrandByIdControllers,
} from '../controllers/brandControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const brandRouter = express.Router();

brandRouter.post('/', isloggedIn, createBrandControllers);
brandRouter.get('/', getAllBrandsControllers);
brandRouter.get('/:id', getBrandByIdControllers);
brandRouter.put('/:id', isloggedIn, updateBrandByIdControllers);
brandRouter.delete('/:id/delete', isloggedIn, deleteBrandByIdControllers);

export default brandRouter;
