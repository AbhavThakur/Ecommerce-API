import asyncHandler from 'express-async-handler';
import { ColorModal } from '../model/index.js';

export const createColorControllers = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const color = await ColorModal.findOne({ name });
  if (color) {
    throw new Error('Color already exists');
  }
  const newColor = await ColorModal.create({
    name,
    user: req.userAuthId,
  });
  res.status(201).json({
    status: 'success',
    data: {
      Color: newColor,
    },
  });
});

export const getAllColorsControllers = asyncHandler(async (req, res) => {
  const colors = await ColorModal.find();
  res.status(200).json({
    status: 'success',
    message: 'Colors found',
    data: {
      colors,
    },
  });
});

export const getColorByIdControllers = asyncHandler(async (req, res) => {
  const color = await ColorModal.findById(req.params.id);
  if (!color) {
    throw new Error('Color not found');
  }
  res.status(200).json({
    status: 'success',
    message: 'Color found',
    data: {
      color,
    },
  });
});

export const updateColorByIdControllers = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const color = await ColorModal.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  if (!color) {
    throw new Error('Color not found');
  }
  res.status(200).json({
    status: 'success',
    message: 'Color updated',
    data: {
      color,
    },
  });
});

export const deleteColorByIdControllers = asyncHandler(async (req, res) => {
  const color = await ColorModal.findByIdAndDelete(req.params.id);
  if (!color) {
    throw new Error('Color not found or already deleted');
  }
  res.status(200).json({
    status: 'success',
    message: 'Color deleted',
    data: {
      color,
    },
  });
});
