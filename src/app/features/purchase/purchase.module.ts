import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase.component';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    PurchaseComponent,
    PurchaseRequestComponent
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    ButtonModule
  ]
})
export class PurchaseModule { }
