export interface ExportResponseInterface {
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
