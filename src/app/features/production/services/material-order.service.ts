import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PurchaseOrder } from '../../purchase/models/purchase-order.interface';

@Injectable({
  providedIn: 'root'
})
export class MaterialOrderService {
  private materialOrders: any[] = [];
  private currentId = 1;

  constructor() {
    // Initialize with a sample material order
    this.materialOrders = [
      {
        id: 1,
        purchaseOrderId: 1,
        receiptNumber: 'RCV-1-20240120',
        receivedDate: new Date('2024-01-20'),
        supplier: 'ABC Manufacturing',
        items: [
          {
            itemName: 'Steel Rods',
            unit: 'pcs',
            quantity: 100,
            receivedQuantity: 100,
            unitPrice: 25,
            total: 2500
          },
          {
            itemName: 'Aluminum Sheets',
            unit: 'sheets',
            quantity: 50,
            receivedQuantity: 50,
            unitPrice: 60,
            total: 3000
          }
        ],
        totalAmount: 5500,
        status: 'received'
      }
    ];
    this.currentId = 2; // Set next ID
  }

  getMaterialOrder(id: number): Observable<any> {
    const order = this.materialOrders.find(o => o.id === +id);
    console.log('Getting material order:', id, order); // For debugging
    return of(order!);
  }

  getMaterialOrders(): Observable<any[]> {
    return of(this.materialOrders);
  }

  createFromPurchaseOrder(purchaseOrder: PurchaseOrder): Observable<any> {
    const materialOrder: any = {
      id: this.currentId++,
      purchaseOrderId: purchaseOrder.id,
      receiptNumber: `RCV-${purchaseOrder.id}-${Date.now()}`,
      receivedDate: new Date(),
      supplier: purchaseOrder.supplier,
      items: purchaseOrder.items.map(item => ({
        itemName: item.itemName,
        unit: item.unit,
        quantity: item.quantity,
        receivedQuantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total
      })),
      totalAmount: purchaseOrder.totalAmount,
      status: 'received'
    };

    this.materialOrders.push(materialOrder);
    console.log('Created material order:', materialOrder); // For debugging
    console.log('Current material orders:', this.materialOrders); // For debugging
    return of(materialOrder);
  }
}
