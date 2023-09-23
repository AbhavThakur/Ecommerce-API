import asyncHandler from 'express-async-handler';
import Category from '../model/Category.js';

export const createCategoryControllers = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.findOne({ name });
  if (category) {
    throw new Error('Category already exists');
  }
  const newCategory = await Category.create({ name, user: req.userAuthId });
  res.status(201).json({
    status: 'success',
    data: {
      category: newCategory,
    },
  });
});

export const getAllCategoriesControllers = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({
    status: 'success',
    message: 'Categories found',
    data: {
      categories,
    },
  });
});

export const getCategoryByIdControllers = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new Error('Category not found');
  }
  res.status(200).json({
    status: 'success',
    message: 'Category found',
    data: {
      category,
    },
  });
});

export const updateCategoryByIdControllers = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  if (!category) {
    throw new Error('Category not found');
  }
  res.status(200).json({
    status: 'success',
    message: 'Category updated',
    data: {
      category,
    },
  });
});

export const deleteCategoryByIdControllers = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    throw new Error('Category not found');
  }
  res.status(200).json({
    status: 'success',
    message: 'Category deleted',
    data: {
      category,
    },
  });
});
