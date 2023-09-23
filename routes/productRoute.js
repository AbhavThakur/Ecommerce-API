import express from 'express';
import {
  createProductControllers,
  deleteProductByIdControllers,
  getAllProductsControllers,
  getProductByIdControllers,
  updateProductByIdControllers,
} from '../controllers/productsControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const productRouter = express.Router();

productRouter.post('/', isloggedIn, createProductControllers);
productRouter.get('/', getAllProductsControllers);
productRouter.get('/:id', getProductByIdControllers);
productRouter.put('/:id', isloggedIn, updateProductByIdControllers);
productRouter.delete('/:id/delete', isloggedIn, deleteProductByIdControllers);

export default productRouter;
