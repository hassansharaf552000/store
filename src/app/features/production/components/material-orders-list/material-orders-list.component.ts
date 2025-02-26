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
    console.log('Starting to load material orders...');
    this.materialOrderService.getMaterialOrders().subscribe({
      next: (response: any) => {
        console.log('Raw response:', response);
        console.log('Response type:', typeof response);
        console.log('Is array?', Array.isArray(response));
        
        if (response && response.results) {
          console.log('Results found:', response.results);
          this.materialOrders = response.results;
        } else {
          console.log('No results property found in response');
          this.materialOrders = Array.isArray(response) ? response : [response];
        }
        
        console.log('Final materialOrders:', this.materialOrders);
      },
      error: (error) => {
        console.error('Error details:', error);
        if (error.error) {
          console.error('Server error:', error.error);
        }
        if (error.status) {
          console.error('Status code:', error.status);
        }
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
