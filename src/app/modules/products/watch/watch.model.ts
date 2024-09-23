import { Schema, model } from 'mongoose'
import { IWatch, WatchModel } from './watch.interface'
import ApiError from '../../../../errors/ApiError'
import status from 'http-status'

const watchSchema = new Schema<IWatch>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
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
    rating: {
      type: Number,
      min: [0, 'Wrong min rating'],
      max: [5, 'Wrong max rating'],
      default: 0,
    },
    stock: {
      type: Number,
      min: [0, 'Wrong min rating'],
      default: 0,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

watchSchema.pre('save', async function (next) {
    const isExist = await Watch.findOne({ title: this.title })

    if (isExist) {
      throw new ApiError(status.CONFLICT, 'This watch is already exist!')
    }

    next()
})

export const Watch = model<IWatch, WatchModel>('Watches', watchSchema)


