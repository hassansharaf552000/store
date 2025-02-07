import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrder } from './models/purchase-order.interface';
import { PurchaseOrderService } from './services/purchase-order.service';

@Component({
  selector: 'app-purchase',
  standalone: false,
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss'
})
export class PurchaseComponent {
  orders: PurchaseOrder[] = [];
  expandedRows: { [key: number]: boolean } = {};

  constructor(
    private purchaseOrderService: PurchaseOrderService,
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
}

