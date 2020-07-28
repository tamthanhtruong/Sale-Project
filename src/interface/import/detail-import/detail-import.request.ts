export class DetailImportCreateRequest {
  importId: string;
  productId: string;
  unitProductId: string;
  quantity: number;
  price: number;
}

export class DetailImportUpdateRequest {
  id: string;
  importId: string;
  productId: string;
  unitProductId: string;
  quantity: number;
  price: number;
}
