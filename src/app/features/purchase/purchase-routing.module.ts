import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';

const routes: Routes = [
  { path: '', component: PurchaseComponent },
  {
    path: 'purchase-order',
    component: PurchaseOrderComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
