import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrder } from './models/purchase-order.interface';
import { PurchaseService } from './services/purchase.service';
import { MaterialUnit, MaterialUnitLabels } from '../warehouse/models/raw-material.model';

@Component({
  selector: 'app-purchase',
  standalone: false,
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss'
})
export class PurchaseComponent {
  orders: PurchaseOrder[] = [];
  expandedRows: { [key: number]: boolean } = {};

  private statusTranslations: { [key: string]: string } = {
    'accepted': 'مقبول',
    'declined': 'مرفوض',
    'pending': 'قيد الانتظار'
  };

  constructor(
    private purchaseService: PurchaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.purchaseService.getOrders().subscribe({
      next: (response) => {
        this.orders = response.results;
        console.log('Loaded orders:', response);
      },
      error: (error) => {
        console.error('Failed to load orders:', error);
      }
    });
  }

  toggleRow(order: PurchaseOrder) {
    this.expandedRows[order.id] = !this.expandedRows[order.id];
    console.log('Toggled row:', order.id, 'Expanded state:', this.expandedRows);
  }

  onAccept(order: PurchaseOrder) {
    this.purchaseService.updateOrderStatus(order.id, 'accepted').subscribe(() => {
      this.loadOrders();
    });
  }

  onDecline(order: PurchaseOrder) {
    this.purchaseService.updateOrderStatus(order.id, 'declined').subscribe(() => {
      this.loadOrders();
    });
  }

  getStatusInArabic(status: string): string {
    return this.statusTranslations[status] || status;
  }

  navigateToCreateOrder() {
    this.router.navigate(['/main/purchase/purchase-order']);
  }

  getUnitLabel(unitId: number): string {
    return MaterialUnitLabels.get(unitId as MaterialUnit) || 'غير محدد';
  }

  viewDetails(order: PurchaseOrder) {
    this.router.navigate(['/main/purchase/details', order.id]);
  }

  onToggleClick(event: Event, order: PurchaseOrder) {
    event.stopPropagation(); // Prevent event bubbling
    this.toggleRow(order);
  }
}

