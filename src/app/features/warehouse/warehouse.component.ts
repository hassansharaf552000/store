import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-warehouse',
  standalone: false,
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent {

  constructor(private router: Router) {
   
  }

  navigateToAddInventory() {
    this.router.navigate(['/main/warehouse/add']);
  }

  navigateToInventoryList() {
    this.router.navigate(['/main/warehouse/inventory']);
  }

  navigateToRawMaterialsEntry() {
    this.router.navigate(['/main/warehouse/entry-raw-materials']);
  }
}
