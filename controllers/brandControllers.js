import asyncHandler from 'express-async-handler';
import { Brand } from '../model/index.js';

export const createBrandControllers = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.findOne({ name });
  if (brand) {
    throw new Error('Brand already exists');
  }
  const newBrand = await Brand.create({
    name,
    user: req.userAuthId,
  });
  res.status(201).json({
    status: 'success',
    data: {
      Brand: newBrand,
    },
  });
});

export const getAllBrandsControllers = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.status(200).json({
    status: 'success',
    message: 'Brands found',
    data: {
      brands,
    },
  });
});

export const getBrandByIdControllers = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    throw new Error('Brand not found');
  }
  res.status(200).json({
    status: 'success',
    message: 'Brand found',
    data: {
      brand,
    },
  });
});

export const updateBrandByIdControllers = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  if (!brand) {
    throw new Error('Brand not found');
  }
  res.status(200).json({
    status: 'success',
    message: 'Brand updated',
    data: {
      brand,
    },
  });
});

export const deleteBrandByIdControllers = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);
  if (!brand) {
    throw new Error('Brand not found or already deleted');
  }
  res.status(200).json({
    status: 'success',
    message: 'Brand deleted',
    data: {
      brand,
    },
  });
});
