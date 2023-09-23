import express from 'express';
import {
  createCategoryControllers,
  deleteCategoryByIdControllers,
  getAllCategoriesControllers,
  getCategoryByIdControllers,
  updateCategoryByIdControllers,
} from '../controllers/categoryControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const categoryRouter = express.Router();

categoryRouter.post('/', isloggedIn, createCategoryControllers);
categoryRouter.get('/', getAllCategoriesControllers);
categoryRouter.get('/:id', getCategoryByIdControllers);
categoryRouter.put('/:id', isloggedIn, updateCategoryByIdControllers);
categoryRouter.delete('/:id/delete', isloggedIn, deleteCategoryByIdControllers);

export default categoryRouter;