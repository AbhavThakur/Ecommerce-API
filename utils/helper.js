import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Stripe from 'stripe';

dotenv.config();

export const Schema = mongoose.Schema;

export const Modal = (modalName, Schema) => mongoose.model(modalName, Schema);

export const stripe = new Stripe(process.env.STRIPE_KEY);
export const endpointSecret =
  'whsec_2e06f4ae747b60b5ee4a5df0a3d140feab02764737c0a34752c78693b8501eaf';

export function generateRandomOrderNumber(length) {
  const generatedOrderNumbers = new Set();
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  while (true) {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    if (!generatedOrderNumbers.has(result)) {
      generatedOrderNumbers.add(result);
      return result;
    }

    // If the generated order number already exists, reset it and try again
    result = '';
  }
}
