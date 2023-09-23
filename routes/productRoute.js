import express from 'express';
import {
  createProductControllers,
  getAllProductsControllers,
} from '../controllers/productsControllers.js';
import { isloggedIn } from '../middlewares/isLoggedIn.js';

const productRouter = express.Router();

productRouter.post('/', isloggedIn, createProductControllers);
productRouter.get('/', getAllProductsControllers);

export default productRouter;
