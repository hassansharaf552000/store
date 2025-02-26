export interface Supplier {
  name: string;
  contact_info?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface UserMinimal {
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export interface RawMaterial {
  id: number;
  name: string;
  unit_count: number;
  created_at: string;
  updated_at: string;
  unit: number;
}

export interface PurchaseOrderItem {
  id: number;
  raw_material: RawMaterial;
  unit: number;
  quantity: number;
  unit_price: number;
  is_delivered: boolean;
  delivery_status: string;
  delivery_status_display: string;
  material_id: number;
  material_name: string;
  unit_id: number;
}

export type PurchaseOrderStatus = 'pending' | 'approved' | 'rejected';

export interface PurchaseOrder {
  id: number;
  purchase_number: string;
  purpose: string;
  status: PurchaseOrderStatus;
  status_display: string;
  supplier: Supplier;
  created_by: string;
  created_at: string;
  delivery_date?: string;
  total_cost: number;
  raw_materials: PurchaseOrderItem[];
}

export interface PurchaseResponse {
  results: PurchaseOrder[];
}
