export class ExportCreateRequest {
  receiverId: string;
  invoiceNumber: number;
  note: string;
  createdUserId: string;
  accountantUserId: string;
  accConfirmedDate: number;
  stockkeeperUserId: string;
  stockConfirmedDate: number;
  status: string;
}

export class ExportUpdateRequest {
  receiverId: string;
  invoiceNumber: number;
  note: string;
  createdUserId: string;
  accountantUserId: string;
  accConfirmedDate: number;
  stockkeeperUserId: string;
  stockConfirmedDate: number;
  status: string;
}
