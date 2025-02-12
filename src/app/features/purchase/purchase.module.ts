import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    PurchaseComponent,
    PurchaseOrderComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PurchaseRoutingModule,
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
    DialogModule
  ],
  providers: [MessageService]
})
export class PurchaseModule { }
