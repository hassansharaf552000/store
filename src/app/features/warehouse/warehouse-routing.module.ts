import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseComponent } from './warehouse.component';
import { AddToInventoryComponent } from './components/add-to-inventory/add-to-inventory.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { EntryRawMaterialsComponent } from './components/entry-raw-materials/entry-raw-materials.component';

const routes: Routes = [
  { 
    path: '', 
    component: WarehouseComponent,
    children: [
      { path: 'add', component: AddToInventoryComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'entry-raw-materials', component: EntryRawMaterialsComponent },
      { path: 'inventory/add/:id', component: AddToInventoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
