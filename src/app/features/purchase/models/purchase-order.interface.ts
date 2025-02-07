export interface PurchaseOrderItem {
  itemName: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PurchaseOrder {
  id: number;
  supplier: string;
  orderDate: Date;
  items: PurchaseOrderItem[];
  totalAmount: number;
  status: 'pending' | 'accepted' | 'declined';
}
