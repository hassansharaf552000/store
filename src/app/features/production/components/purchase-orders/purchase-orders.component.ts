import { Component } from '@angular/core';
import { PurchaseOrder } from '../../../purchase/models/purchase-order.interface';
import { PurchaseOrderService } from '../../../purchase/services/purchase-order.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MaterialOrderService } from '../../services/material-order.service';

@Component({
  selector: 'app-purchase-orders',
  standalone: false,
  
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.scss'
})
export class PurchaseOrdersComponent {
  orders: PurchaseOrder[] = [];
  expandedRows: { [key: number]: boolean } = {};

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private materialOrderService: MaterialOrderService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.purchaseOrderService.getOrders().subscribe(orders => {
      this.orders = orders;
      console.log('Loaded orders:', this.orders);
    });
  }

  toggleRow(order: PurchaseOrder) {
    this.expandedRows[order.id] = !this.expandedRows[order.id];
    console.log('Toggled row:', order.id, 'Expanded state:', this.expandedRows);
  }

  onAccept(order: PurchaseOrder) {
    this.purchaseOrderService.updateOrderStatus(order.id, 'accepted').subscribe(() => {
      this.materialOrderService.createFromPurchaseOrder(order).subscribe(
        (materialOrder) => {
          this.messageService.add({
            severity: 'success',
            summary: 'نجاح',
            detail: `تم إنشاء طلب المواد برقم الإيصال: ${materialOrder.receiptNumber}`
          });
          this.router.navigate(['/production/material-order', materialOrder.id]);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'خطأ',
            detail: 'فشل في إنشاء طلب المواد'
          });
        }
      );
      this.loadOrders();
    });
  }

  onDecline(order: PurchaseOrder) {
    this.purchaseOrderService.updateOrderStatus(order.id, 'declined').subscribe(() => {
      this.loadOrders();
    });
  }

  navigateToCreateOrder() {
    this.router.navigate(['purchase/purchase-order']);
  }

  goBack() {
    this.router.navigate(['/production']);
  }
}

