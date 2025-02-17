import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseComponent } from './warehouse.component';
import { AddToInventoryComponent } from './components/add-to-inventory/add-to-inventory.component';
import { InventoryComponent } from './components/inventory/inventory.component';

const routes: Routes = [
  { 
    path: '', 
    component: WarehouseComponent,
    children: [
      { path: 'add', component: AddToInventoryComponent },
      { path: 'inventory', component: InventoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
