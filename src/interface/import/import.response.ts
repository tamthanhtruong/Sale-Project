export interface ImportResponseInterface {
  readonly _id: string;
  shipper: string;
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
