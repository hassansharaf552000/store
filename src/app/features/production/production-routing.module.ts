import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionComponent } from './production.component';
import { PurchaseOrdersComponent } from './components/purchase-orders/purchase-orders.component';
import { MaterialOrderComponent } from './components/material-order/material-order.component';
import { MaterialOrdersListComponent } from './components/material-orders-list/material-orders-list.component';

const routes: Routes = [
  { path: '', component: ProductionComponent },
  { path: 'purchase-orders', component: PurchaseOrdersComponent },
  { path: 'material-orders', component: MaterialOrdersListComponent },
  { path: 'material-order/:id', component: MaterialOrderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
