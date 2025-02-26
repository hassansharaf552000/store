import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialOrderService } from '../../services/material-order.service';
import { PurchaseOrder } from '../../../purchase/models/purchase-order.interface';

@Component({
  selector: 'app-material-order',
standalone: false,  
  templateUrl: './material-order.component.html',
  styleUrls: ['./material-order.component.scss']
})
export class MaterialOrderComponent implements OnInit {
  orderId: number | null = null;
  loading = true;
  materialOrder: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materialOrderService: MaterialOrderService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.orderId = +params['id'];
        this.loadOrderDetails(this.orderId);
      }
    });
  }

  loadOrderDetails(id: number) {
    this.loading = true;
    this.materialOrderService.getOrder(id).subscribe({
      next: (order) => {
        console.log('Loaded order:', order);
        this.materialOrder = order;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading order:', error);
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/main/production/material-orders']);
  }
  viewOrderDetails(orderId: number): void {
    // Add your logic here to handle viewing order details
    console.log('Viewing order details for order ID:', orderId);
  }
}
