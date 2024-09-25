import { Model } from 'mongoose'

export type IWatch = {
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: [string]
  deleted: boolean
}

export type WatchModel = Model<IWatch, Record<string, unknown>>
