import * as mongoose from "mongoose";
import { ProductStatusEnum } from '../../enum';

// Khai báo data cho mongoose
export const ProductSchema = new mongoose.Schema({
  // category: CategorySchema,
  categoryId: {
    type: String,
    required: true,
    trim: String,
  } ,
  // category: String,
  unitProductId: {
    type: String,
    required: true,
    trim: String,
  },
  name: String,
  code: String,
  originPrice: Number,
  price: Number,
  image: String,
  information: String,
  evaluation: String,
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  status: {
    type: String,
    enum: Object.values(ProductStatusEnum as object),
    default: ProductStatusEnum.EXIST,
  },
  deletedAt: Number,
});

export interface ProductInterface extends mongoose.Document {
  readonly _id: string;
  categoryId: string;
  unitProductId: string;
  name: string;
  code: string;
  originPrice: number;
  price: number;
  image: string;
  information: string;
  evaluation: string;
  updatedAt?: number;
  createdAt?: number;
  status: string;
  deletedAt?: number;
}
