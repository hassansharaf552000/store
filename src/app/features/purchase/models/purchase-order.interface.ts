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
  status: 'pending' | 'approved' | 'rejected ';
  supplier: Supplier;
  created_by: UserMinimal;
  delivery_date?: string;
  total_cost?: string;
}

export interface PurchaseResponse {
  results: PurchaseOrder[];
}
