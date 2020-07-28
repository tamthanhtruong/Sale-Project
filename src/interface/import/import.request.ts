export class ImportCreateRequest {
  shipper: string;
  invoiceNumber: number;
  note: string;
  createdUserId: string;
  accountantUserId: string;
  accConfirmedDate: number;
  stockkeeperUserId: string;
  stockConfirmedDate: number;
  status: string;
}

export class ImportUpdateRequest {
  id: string;
  shipper: string;
  invoiceNumber: number;
  note: string;
  createdUserId: string;
  accountantUserId: string;
  accConfirmedDate: number;
  stockkeeperUserId: string;
  stockConfirmedDate: number;
  status: string;
}
