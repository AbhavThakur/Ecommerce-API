import asyncHandler from 'express-async-handler';

export const createOrderControllers = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Order created successfully',
  });
});
