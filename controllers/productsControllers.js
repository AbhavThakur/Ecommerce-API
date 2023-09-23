import asyncHandler from 'express-async-handler';
import Product from '../model/Product.js';

//@desc Create new Product
//@route POST /api/v1/products
//@access Private/Admin
export const createProductControllers = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
    images,
    price,
    totalQty,
  } = req.body;

  const isProductExists = await Product.findOne({ name });

  if (isProductExists) {
    throw new Error('Product already exists');
  }
  const product = await Product.create({
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    images,
    price,
    totalQty,
  });

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product,
  });
});

//@desc GET allProduct
//@route GET /api/v1/products
//@access Public
export const getAllProductsControllers = asyncHandler(async (req, res) => {
  const query = {};

  const queryParams = {
    name: req.query.name,
    brand: req.query.brand,
    category: req.query.category,
    sizes: req.query.size,
    colors: req.query.color,
    price: req.query.price,
  };

  // Filter out empty query parameters
  Object.keys(queryParams).forEach((key) => {
    if (queryParams[key]) {
      query[key] = { $regex: queryParams[key], $options: 'i' };
    }
    if (key === 'price') {
      const priceRange = queryParams[key].split('-');
      query[key] = { $gte: priceRange[0], $lte: priceRange[1] };
    }
  });

  const products = await Product.find(query);

  res.status(200).json({
    success: true,
    data: products,
  });
});
