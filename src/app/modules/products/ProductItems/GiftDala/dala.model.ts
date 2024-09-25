import { Schema, model } from 'mongoose';
// import { IWatch, WatchModel } from './watch.interface';
import ApiError from '../../../../../errors/ApiError';
import status from 'http-status';
import { IDala, DalaModel } from './dala.interface';

const dalaSchema = new Schema<IDala>(
  {
    title: { type: String, required: true },
    images: { type: [String], required: true },
    dalaCode: { type: Number, required: true },
    items: { type: [String], required: true },
    details: { type: [Object], required: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      min: [1, 'Wrong min price'],
      max: [10000, 'Wrong max price'],
    },
    discountPercentage: {
      type: Number,
      min: [1, 'Wrong min discount'],
      max: [99, 'Wrong max discount'],
    },
    rating: { type: Number, required: true },
    stock: { type: String, required: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

dalaSchema.pre('save', async function (next) {
  const isExist = await Dala.findOne({ title: this.dalaCode });

  if (isExist) {
    throw new ApiError(status.CONFLICT, 'This dala is already exist!');
  }

  next();
});

export const Dala = model<IDala, DalaModel>('Dalas', dalaSchema);
