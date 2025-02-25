import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../../purchase/models/purchase-order.interface';
import { PurchaseService } from '../../../purchase/services/purchase.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MaterialOrderService } from '../../services/material-order.service';

@Component({
  selector: 'app-purchase-orders',
  standalone: false,
  
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.scss'
})
export class PurchaseOrdersComponent implements OnInit {
  orders: PurchaseOrder[] = [];
  expandedRows: { [key: number]: boolean } = {};

  constructor(
    private purchaseService: PurchaseService,
    private materialOrderService: MaterialOrderService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.purchaseService.getOrders().subscribe(response => {
      this.orders = response.results;
      console.log('Loaded orders:', response);
    });
  }

  toggleRow(order: PurchaseOrder) {
    this.expandedRows[order.id] = !this.expandedRows[order.id];
    console.log('Toggled row:', order.id, 'Expanded state:', this.expandedRows);
  }

  onToggleClick(event: Event, order: PurchaseOrder) {
    event.stopPropagation(); // Prevent event from bubbling up to parent tr
    this.toggleRow(order);
  }

  onAccept(order: PurchaseOrder) {
    this.purchaseService.updateOrderStatus(order.id, 'approved').subscribe({
      next: (updatedOrder) => {
        this.messageService.add({
          severity: 'success',
          summary: 'نجاح',
          detail: 'تم تحديث حالة الطلب بنجاح'
        });
        this.materialOrderService.createFromPurchaseOrder(order).subscribe({
          next: (materialOrder) => {
            this.messageService.add({
              severity: 'success',
              summary: 'نجاح',
              detail: `تم إنشاء طلب المواد برقم الإيصال: ${materialOrder.receiptNumber}`
            });
            this.router.navigate(['/production/material-order', materialOrder.id]);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'خطأ',
              detail: 'فشل في إنشاء طلب المواد'
            });
          }
        });
        this.loadOrders();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحديث حالة الطلب'
        });
      }
    });
  }

  onDecline(order: PurchaseOrder) {
    this.purchaseService.updateOrderStatus(order.id, 'rejected').subscribe({
      next: (updatedOrder) => {
        this.messageService.add({
          severity: 'success',
          summary: 'نجاح',
          detail: 'تم رفض الطلب بنجاح'
        });
        this.loadOrders();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحديث حالة الطلب'
        });
      }
    });
  }

  navigateToCreateOrder() {
    this.router.navigate(['/main/purchase/purchase-order']);
  }

  goBack() {
    this.router.navigate(['/main/production']);
  }
}

