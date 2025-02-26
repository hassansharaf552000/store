import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PurchaseService } from '../../services/purchase.service';
import { PurchaseOrder, PurchaseOrderStatus } from '../../models/purchase-order.interface';
import { MaterialUnit, MaterialUnitLabels } from '../../../warehouse/models/raw-material.model';

@Component({
  selector: 'app-purchase-details',
  standalone: false,
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss']
})
export class PurchaseDetailsComponent implements OnInit {
  purchase: PurchaseOrder | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseService: PurchaseService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPurchase(+id);
    }
  }

  loadPurchase(id: number) {
    this.loading = true;
    this.purchaseService.getOrder(id).subscribe({
      next: (data) => {
        console.log('Loaded purchase:', data);
        
        this.purchase = data;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل تفاصيل الطلب'
        });
        this.loading = false;
      }
    });
  }

  getUnitLabel(unitId: number): string {
    return MaterialUnitLabels.get(unitId as MaterialUnit) || 'غير محدد';
  }

  cancelPurchase() {
    if (this.purchase) {
      this.purchaseService.updateOrderStatus(this.purchase.id, 'cancelled').subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'نجاح',
            detail: 'تم إلغاء الطلب بنجاح'
          });
          this.router.navigate(['/main/purchase']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'خطأ',
            detail: 'فشل في إلغاء الطلب'
          });
        }
      });
    }
  }

  calculateItemTotal(item: any): number {
    return Number(item?.quantity) * Number(item?.unit_price);
  }

  getStatusSeverity(status: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'pending':
        return 'warn';
      default:
        return 'secondary';
    }
  }
  goBack() {
    this.router.navigate(['/main/purchase']);
  }
}
