import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountingService } from '../../services/accounting.service';
import { Invoice } from '../../models/invoice.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-invoice-details',
  standalone: false,
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  invoice: Invoice | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountingService: AccountingService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadInvoice(+id);
    }
  }

  loadInvoice(id: number) {
    this.loading = true;
    this.accountingService.getInvoiceById(id).subscribe({
      next: (response) => {
        console.log('Loaded invoice:', response);
        
        this.invoice = response;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل تفاصيل الفاتورة'
        });
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/main/accounting']);
  }

  printInvoice() {
    // Hide other elements from the page if any
    const originalContents = document.body.innerHTML;
    const printContents = document.querySelector('.invoice-details')?.innerHTML;
    
    if (printContents) {
      document.body.innerHTML = `
        <div dir="rtl" class="invoice-details">
          ${printContents}
        </div>
      `;
      console.log('Printing invoice:', document.body.innerHTML);
      
      window.print();
      
      // Restore the page after printing
      document.body.innerHTML = originalContents;
      // Reinitialize the component
      this.loadInvoice(this.invoice?.id || 0);
    }
  }

  calculateTotal(): number {
    if (!this.invoice?.items) return 0;
    return this.invoice.items.reduce((acc, item) => 
      acc + (parseFloat(item.subtotal) || 0), 0);
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

  getFullName(user: any): string {
    if (user.first_name || user.last_name) {
      return `${user.first_name} ${user.last_name}`.trim();
    }
    return 'غير محدد';
  }

  getRawMaterialName(materialId: number): string {
    const material = this.invoice?.purchase.raw_materials.find(
      rm => rm.id === materialId
    );
    console.log("material name ", material);
    
    return material ? material.raw_material.name : 'غير معروف';
  }
}
