import express from 'express';
import upload from '../config/fileUpload.js';
import {
  createProductControllers,
  deleteProductByIdControllers,
  getAllProductsControllers,
  getProductByIdControllers,
  updateProductByIdControllers,
} from '../controllers/productsControllers.js';
import isAdmin from '../middlewares/isAdmin.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const productRouter = express.Router();

productRouter.post(
  '/',
  isloggedIn,
  isAdmin,
  upload.array('files'),
  createProductControllers
);
productRouter.get('/', getAllProductsControllers);
productRouter.get('/:id', getProductByIdControllers);
productRouter.put('/:id', isloggedIn, isAdmin, updateProductByIdControllers);
productRouter.delete(
  '/:id/delete',
  isloggedIn,
  isAdmin,
  deleteProductByIdControllers
);

export default productRouter;
