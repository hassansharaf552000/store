export interface Supplier {
  id: number;
  name: string;
  contact_info: string | null;
  email: string | null;
  phone: string | null;
  address: string;
  created_at: string;
}

export interface MaterialOrder {
  id: number;
  purchase_number: string;
  purpose: string;
  status: string;
  status_display: string;
  supplier: Supplier;
  created_at: string;
  delivery_date: string | null;
  total_cost: string;
}
