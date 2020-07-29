import * as mongoose from "mongoose";
import { ExportStatusEnum } from '../../enum';

export const ExportSchema = new mongoose.Schema({
  receiverId: String,
  invoiceNumber: Number,
  invoiceDate: { type: Number, default: Date.now },
  note: String,
  createdUserId: String,
  createdDate: { type: Number, default: Date.now },
  accountantUserId: String,
  accConfirmedDate: Number,
  stockkeeperUserId: String,
  stockConfirmedDate: Number,
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  status: { type: String, enum: Object.values(ExportStatusEnum as object), default: ExportStatusEnum.LOCK},
  deletedAt: Number,
});

export interface ExportInterface extends mongoose.Document {
  readonly _id: string;
  receiverId: string;
  invoiceNumber: number;
  invoiceDate?: number;
  note: string;
  createdUserId: string;
  createdDate?: string;
  accountantUserId: string;
  accConfirmedDate: number;
  stockkeeperUserId: string;
  stockConfirmedDate: number;
  createdAt?: number;
  updatedAt?: number;
  status: string;
  deletedAt?: number;
}



