import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PurchaseOrder } from '../models/purchase-order.interface';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private fakeOrders: PurchaseOrder[] = [
    {
      id: 1001,
      supplier: 'Tech Supplies Inc.',
      orderDate: new Date(),
      items: [
        { itemName: 'Laptop Dell XPS 15', unit: 'PCS', quantity: 5, unitPrice: 1500, total: 7500 },
        { itemName: 'Wireless Mouse MX Master', unit: 'PCS', quantity: 10, unitPrice: 99, total: 990 },
        { itemName: 'USB-C Dock Station', unit: 'PCS', quantity: 5, unitPrice: 250, total: 1250 },
        { itemName: '27" 4K Monitor', unit: 'PCS', quantity: 3, unitPrice: 699, total: 2097 }
      ],
      totalAmount: 11837,
      status: 'pending'
    },
    {
      id: 1002,
      supplier: 'Office Solutions Ltd.',
      orderDate: new Date(Date.now() - 86400000),
      items: [
        { itemName: 'Executive Office Chair', unit: 'PCS', quantity: 8, unitPrice: 450, total: 3600 },
        { itemName: 'Adjustable Standing Desk', unit: 'PCS', quantity: 5, unitPrice: 800, total: 4000 },
        { itemName: 'Filing Cabinet - Large', unit: 'PCS', quantity: 3, unitPrice: 350, total: 1050 },
        { itemName: 'LED Desk Lamp Pro', unit: 'PCS', quantity: 15, unitPrice: 85, total: 1275 }
      ],
      totalAmount: 9925,
      status: 'pending'
    },
    {
      id: 1003,
      supplier: 'Electronics Wholesale Co.',
      orderDate: new Date(Date.now() - 172800000),
      items: [
        { itemName: 'iPhone 14 Pro', unit: 'PCS', quantity: 10, unitPrice: 1299, total: 12990 },
        { itemName: 'AirPods Pro 2nd Gen', unit: 'PCS', quantity: 20, unitPrice: 249, total: 4980 },
        { itemName: 'iPad Pro 12.9"', unit: 'PCS', quantity: 5, unitPrice: 1099, total: 5495 },
        { itemName: 'MacBook Air M2', unit: 'PCS', quantity: 8, unitPrice: 1199, total: 9592 }
      ],
      totalAmount: 33057,
      status: 'pending'
    },
    {
      id: 1004,
      supplier: 'Network Solutions Inc.',
      orderDate: new Date(Date.now() - 259200000),
      items: [
        { itemName: 'Cisco Switch 48-Port', unit: 'PCS', quantity: 2, unitPrice: 3499, total: 6998 },
        { itemName: 'Network Cable Cat6 1000ft', unit: 'BOX', quantity: 5, unitPrice: 180, total: 900 },
        { itemName: 'Wireless Access Point', unit: 'PCS', quantity: 10, unitPrice: 299, total: 2990 },
        { itemName: 'Server Rack Cabinet', unit: 'PCS', quantity: 1, unitPrice: 1200, total: 1200 }
      ],
      totalAmount: 12088,
      status: 'pending'
    }
  ];

  getOrders(): Observable<PurchaseOrder[]> {
    return of(this.fakeOrders);
  }

  updateOrderStatus(orderId: number, status: 'accepted' | 'declined'): Observable<boolean> {
    const order = this.fakeOrders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      return of(true);
    }
    return of(false);
  }
}
