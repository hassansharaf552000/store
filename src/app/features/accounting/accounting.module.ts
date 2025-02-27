import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';

@NgModule({
  declarations: [
    AccountingComponent,
    InvoiceDetailsComponent
  ],
  imports: [
    CommonModule,
    AccountingRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [MessageService]
})
export class AccountingModule { }
