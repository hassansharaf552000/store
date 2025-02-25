import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialOrderService } from '../../services/material-order.service';

@Component({
  selector: 'app-material-orders-list',
  standalone: false,
  templateUrl: './material-orders-list.component.html',
  styleUrls: ['./material-orders-list.component.scss']
})
export class MaterialOrdersListComponent implements OnInit {
  materialOrders: any[] = [];

  constructor(
    private materialOrderService: MaterialOrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMaterialOrders();
  }

  loadMaterialOrders() {
    this.materialOrderService.getMaterialOrders().subscribe({
      next: (orders) => {
        console.log('Loaded material orders:', orders); // For debugging
        this.materialOrders = orders;
      },
      error: (error) => {
        console.error('Error loading material orders:', error);
      }
    });
  }

  viewReceipt(order: any) {
    this.router.navigate(['/main/production/material-order', order.id]);
  }

  goBack() {
    this.router.navigate(['/main/production']);
  }
}
