import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-production',
  standalone: false,
  templateUrl: './production.component.html',
  styleUrl: './production.component.scss'
})
export class ProductionComponent {
  constructor(private router: Router) {}

  navigateToPurchaseOrders() {
    this.router.navigate(['/main/production/purchase-orders']);
  }

  navigateToMaterialOrders() {
    this.router.navigate(['/main/production/material-orders']);
  }
}
