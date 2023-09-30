import express from 'express';
import categoryUpload from '../config/categoryUpload.js';
import {
  createCategoryControllers,
  deleteCategoryByIdControllers,
  getAllCategoriesControllers,
  getCategoryByIdControllers,
  updateCategoryByIdControllers,
} from '../controllers/categoryControllers.js';
import isAdmin from '../middlewares/isAdmin.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const categoryRouter = express.Router();

categoryRouter.post(
  '/',
  isloggedIn,
  isAdmin,
  categoryUpload.single('file'),
  createCategoryControllers
);
categoryRouter.get('/', getAllCategoriesControllers);
categoryRouter.get('/:id', getCategoryByIdControllers);
categoryRouter.put('/:id', isloggedIn, isAdmin, updateCategoryByIdControllers);
categoryRouter.delete(
  '/:id/delete',
  isloggedIn,
  isAdmin,
  deleteCategoryByIdControllers
);

export default categoryRouter;
