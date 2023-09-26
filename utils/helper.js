import mongoose from 'mongoose';

export const Schema = mongoose.Schema;

export const Modal = (modalName, Schema) => mongoose.model(modalName, Schema);
