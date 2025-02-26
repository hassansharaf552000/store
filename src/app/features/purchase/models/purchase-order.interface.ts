export enum PurchaseOrderStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

interface Supplier {
  id: number;
  name: string;
  contact_info: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface RawMaterial {
  id: number;
  name: string;
  unit_count: string;
  created_at: string;
  updated_at: string;
  unit: number;
}

interface PurchaseOrderMaterial {
  id: number;
  raw_material: RawMaterial;
  unit: number;
  quantity: string;
  unit_price: string;
  is_delivered: boolean;
  delivery_status: string;
  delivery_status_display: string;
}

export interface PurchaseOrder {
  id: number;
  purchase_number: string;
  purpose: string;
  status: PurchaseOrderStatus;
  status_display: string;
  supplier: Supplier;
  created_by: User;
  created_at: string;
  delivery_date: string;
  total_cost: string;
  raw_materials: PurchaseOrderMaterial[];
}

export interface PurchaseResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PurchaseOrder[];
}
