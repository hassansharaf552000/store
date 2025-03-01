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
    const fullInvoice = this.invoice;
    const printStyles = `
      <style>
        @page { size: A4; margin: 15mm; }
        body { font-family: Arial, sans-serif; }
        .invoice-container { padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .invoice-details { margin-bottom: 20px; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: right; }
        .table th { background-color: #f5f5f5; }
        .total { text-align: left; font-weight: bold; }
        .footer { margin-top: 50px; text-align: center; }
        .metadata-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 15px;
        }
        .info-section {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 5px;
        }
        .info-section h3 {
          margin: 0 0 10px 0;
          padding-bottom: 5px;
          border-bottom: 2px solid #f5f5f5;
          color: #333;
        }
        .info-row {
          margin: 8px 0;
        }
        .info-row strong {
          display: inline-block;
          min-width: 120px;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          background: #e8f5e9;
          color: #2e7d32;
        }
        .signature-section {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 30px;
          margin-bottom: 20px;
        }
        .signature-box {
          flex: 1;
          text-align: center;
        }
        .signature-box p {
          margin-bottom: 30px;
          font-weight: bold;
          font-size: 14px;
        }
        .signature-line {
          border-bottom: 1px dotted gray;
          width: 100%;
        }
      </style>
    `;
    


    if (fullInvoice){
      const printContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>فاتورة - ${fullInvoice.invoice_number}</title>
        ${printStyles}
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <h1>فاتورة شراء</h1>
            <h2>${fullInvoice.invoice_number}</h2>
          </div>
          
          <div class="metadata-grid">
            <div class="info-section">
              <h3>معلومات الفاتورة</h3>
              <div class="info-row"><strong>رقم الفاتورة:</strong> ${fullInvoice.invoice_number}</div>
              <div class="info-row"><strong>تاريخ الفاتورة:</strong> ${new Date(fullInvoice.invoice_date).toLocaleDateString('ar-EG')}</div>
              <div class="info-row"><strong>المبلغ الإجمالي:</strong> ${fullInvoice.total_amount} جنيه</div>
            </div>
            <div class="info-section">
              <h3>معلومات منشئ الطلب</h3>
              <div class="info-row"><strong>اسم المستخدم:</strong> ${fullInvoice.purchase.created_by.username}</div>
              <div class="info-row"><strong>البريد الإلكتروني:</strong> ${fullInvoice.purchase.created_by.email}</div>
              <div class="info-row"><strong>الاسم الكامل:</strong> ${fullInvoice.purchase.created_by.first_name || fullInvoice.purchase.created_by.last_name ? 
                `${fullInvoice.purchase.created_by.first_name} ${fullInvoice.purchase.created_by.last_name}`.trim() : 
                'غير متوفر'}</div>
            </div>

            <div class="info-section">
              <h3>معلومات أمر الشراء</h3>
              <div class="info-row"><strong>رقم أمر الشراء:</strong> ${fullInvoice.purchase.purchase_number}</div>
              <div class="info-row"><strong>الغرض:</strong> ${fullInvoice.purchase.purpose || 'غير محدد'}</div>
              <div class="info-row"><strong>حالة الطلب:</strong> <span class="status-badge">${fullInvoice.purchase.status_display}</span></div>
              <div class="info-row"><strong>تكلفة أمر الشراء:</strong> ${fullInvoice.purchase.total_cost} جنيه</div>
              <div class="info-row"><strong>تاريخ الإنشاء:</strong> ${new Date(fullInvoice.purchase.created_at).toLocaleDateString('ar-EG')}</div>
              ${fullInvoice.purchase.delivery_date ? 
                `<div class="info-row"><strong>تاريخ التسليم:</strong> ${new Date(fullInvoice.purchase.delivery_date).toLocaleDateString('ar-EG')}</div>` : 
                ''}
            </div>

            <div class="info-section">
              <h3>معلومات المورد</h3>
              <div class="info-row"><strong>اسم المورد:</strong> ${fullInvoice.purchase.supplier.name}</div>
              <div class="info-row"><strong>البريد الإلكتروني:</strong> ${fullInvoice.purchase.supplier.email || 'غير متوفر'}</div>
              <div class="info-row"><strong>رقم الهاتف:</strong> ${fullInvoice.purchase.supplier.phone || 'غير متوفر'}</div>
              <div class="info-row"><strong>العنوان:</strong> ${fullInvoice.purchase.supplier.address || 'غير متوفر'}</div>
              <div class="info-row"><strong>معلومات الاتصال:</strong> ${fullInvoice.purchase.supplier.contact_info || 'غير متوفر'}</div>
            </div>

          </div>

          <div class="info-section">
            <h3>تفاصيل الفاتورة</h3>
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>المادة الخام</th>
                  <th>الكمية</th>
                  <th>سعر الوحدة</th>
                  <th>المجموع</th>
                </tr>
              </thead>
              <tbody>
                ${fullInvoice.items.map((item, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${this.getRawMaterialName(item.raw_material)}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unit_price} جنيه</td>
                    <td>${item.subtotal} جنيه</td>
                  </tr>
                `).join('')}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" class="total">الإجمالي</td>
                  <td>${fullInvoice.total_amount} جنيه</td>
                </tr>
              </tfoot>
            </table>
          </div>

          ${fullInvoice.notes ? `
            <div class="info-section">
              <h3>ملاحظات</h3>
              <p>${fullInvoice.notes}</p>
            </div>
          ` : ''}

          <div class="signature-section">
            <div class="signature-box">
              <p>توقيع المورد</p>
              <div class="signature-line"></div>
            </div>
            <div class="signature-box">
              <p>توقيع المستلم</p>
              <div class="signature-line"></div>
            </div>
            <div class="signature-box">
              <p>توقيع المدير</p>
              <div class="signature-line"></div>
            </div>
          </div>

          <div class="footer">
            <p>تم إصدار هذه الفاتورة بواسطة نظام Street Wear</p>
            <p>تاريخ الطباعة: ${new Date().toLocaleDateString('ar-EG')} ${new Date().toLocaleTimeString('ar-EG')}</p>
          </div>
        </div>
      </body>
      </html>
    `;
    // Create a new window for printing with invoice number as title
    const printWindow = window.open(`invoice-${fullInvoice.invoice_number}.html`, `invoice-${fullInvoice.invoice_number}`);
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      // Wait for content to load before printing
      printWindow.onload = function() {
        printWindow.print();
        // Close the window after printing
        printWindow.onafterprint = function() {
          printWindow.close();
        };
      };
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'خطأ',
        detail: 'فشل في فتح نافذة الطباعة. يرجى السماح بالنوافذ المنبثقة.'
      });
    }
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
