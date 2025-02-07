import { CardModule } from 'primeng/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './production.component';
import { PurchaseOrdersComponent } from './components/purchase-orders/purchase-orders.component';
import { MaterialOrderComponent } from './components/material-order/material-order.component';
import { MaterialOrdersListComponent } from './components/material-orders-list/material-orders-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { MaterialOrderService } from './services/material-order.service';

@NgModule({
  declarations: [
    ProductionComponent,
    PurchaseOrdersComponent,
    MaterialOrderComponent,
    MaterialOrdersListComponent
  ],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    DatePickerModule,
    TableModule,
    InputNumberModule,
    ToastModule,
    CalendarModule,
    TagModule,
    RippleModule,
    TooltipModule, 
    DialogModule,
    CardModule ,
    TableModule
 ],
  providers: [
    MaterialOrderService,
    MessageService
  ]
})
export class ProductionModule {}
