import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Stripe from 'stripe';

dotenv.config();

export const Schema = mongoose.Schema;

export const Modal = (modalName, Schema) => mongoose.model(modalName, Schema);

export const stripe = new Stripe(process.env.STRIPE_KEY);
