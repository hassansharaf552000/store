import { Component, OnInit } from '@angular/core';
import { AccountingService } from './services/accounting.service';
import { Invoice } from './models/invoice.interface';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounting',
  standalone: false,
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent implements OnInit {
  invoices: Invoice[] = [];
  loading = false;

  constructor(
    private accountingService: AccountingService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.loading = true;
    this.accountingService.getInvoices().subscribe({
      next: (response: any) => {
        this.invoices = response;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل الفواتير'
        });
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'status-paid';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-overdue';
      default:
        return '';
    }
  }

  viewInvoiceDetails(invoice: Invoice) {
    this.router.navigate(['/main/accounting/invoice', invoice.id]);
  }
}
