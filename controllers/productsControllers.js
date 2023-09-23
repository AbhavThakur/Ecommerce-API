import asyncHandler from 'express-async-handler';
import Category from '../model/Category.js';
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
  // checking if give category exists in database
  const categoryExists = await Category.findOne({
    name: category,
  });
  if (!categoryExists) {
    throw new Error(
      'Category not found,please create category first or check category name'
    );
  }

  const product = await Product.create({
    name,
    description,
    brand,
    category: category.toLowerCase(),
    sizes,
    colors,
    user: req.userAuthId,
    images,
    price,
    totalQty,
  });
  // push the product id into category product
  categoryExists.products.push(product._id);
  // updating the category with new product id
  await categoryExists.save();

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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10; // Default limit is 10 items per page

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
      if (key === 'price') {
        const priceRange = queryParams[key].split('-');
        query[key] = {
          $gte: parseFloat(priceRange[0]), // Convert to float if needed
          $lte: parseFloat(priceRange[1]), // Convert to float if needed
        };
      } else {
        query[key] = { $regex: queryParams[key], $options: 'i' };
      }
    }
  });

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const total = await Product.countDocuments();
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  const products = await Product.find(query).skip(startIndex).limit(limit);

  res.status(200).json({
    success: true,
    total,
    result: products.length,
    pagination,
    data: products,
  });
});

//@desc GET Product by ID
//@route GET /api/v1/products/ID
//@access Public
export const getProductByIdControllers = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new Error('Product not found');
  }
  res.status(200).json({
    success: true,
    message: 'Product found',
    data: product,
  });
});

export const updateProductByIdControllers = asyncHandler(async (req, res) => {
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

  // Update
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
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
    },
    { new: true }
  );

  if (!product) {
    throw new Error('Product not found');
  }
  res.status(200).json({
    success: true,
    message: 'Product found',
    data: product,
  });
});

export const deleteProductByIdControllers = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    throw new Error('Product not found');
  }
  res.status(200).json({
    success: true,
    message: 'Product deleted',
    data: product,
  });
});
