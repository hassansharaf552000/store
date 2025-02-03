import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase.component';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';


@NgModule({
  declarations: [
    PurchaseComponent,
    PurchaseRequestComponent
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule
  ]
})
export class PurchaseModule { }
