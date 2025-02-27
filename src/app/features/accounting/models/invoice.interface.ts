export interface Invoice {
    id: number;
    invoice_number: string;
    purchase: PurchaseOrder;
    invoice_date: string;
    total_amount: string;
    notes: string | null;
    created_at: string;
    items: InvoiceItem[];
}

export interface PurchaseOrder {
    id: number;
    purchase_number: string;
    purpose: string;
    status: string;
    status_display: string;
    supplier: Supplier;
    created_by: User;
    created_at: string;
    delivery_date: string | null;
    total_cost: string;
    raw_materials: PurchaseOrderMaterial[];
}

export interface Supplier {
    id: number;
    name: string;
    contact_info: string | null;
    email: string | null;
    phone: string | null;
    address: string;
    created_at: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface RawMaterial {
    id: number;
    name: string;
    unit_count: string;
    created_at: string;
    updated_at: string;
    unit: number;
}

export interface PurchaseOrderMaterial {
    id: number;
    raw_material: RawMaterial;
    unit: number;
    quantity: string;
    unit_price: string;
    is_delivered: boolean;
    delivery_status: string;
    delivery_status_display: string;
}

export interface InvoiceItem {
    id: number;
    raw_material: number;
    quantity: string;
    unit_price: string;
    subtotal: string;
}

export interface InvoiceResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Invoice[];
}
