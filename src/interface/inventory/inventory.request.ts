export class InventoryCreateRequest {
  invoiceNumber: number;
  note: string;
  createdUserId: string;
  status:  string;
}

export class InventoryUpdateRequest {
  invoiceNumber: number;
  note: string;
  createdUserId: string;
  status:  string;
}
