import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InventoryService } from '../../services/inventory.service';
import { RawMaterial, MaterialUnitLabels } from '../../models/raw-material.model';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  providers: [MessageService]
})
export class InventoryComponent implements OnInit {
  inventoryItems: RawMaterial[] = [];
  loading: boolean = false;
  totalRecords: number = 0;
  currentPage: number = 1;
  rowsPerPage: number = 10;

  statuses: any[] = [
    { label: 'متوفر', value: 'متوفر' },
    { label: 'منخفض', value: 'منخفض' },
    { label: 'نفذت الكمية', value: 'نفذت الكمية' }
  ];

  constructor(
    private inventoryService: InventoryService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(page: number = 1): void {
    this.loading = true;
    this.inventoryService.getAllMaterials(page, this.rowsPerPage)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          console.log("response", response);
          
          this.inventoryItems = response.results;
          this.totalRecords = response.count;
          this.currentPage = page;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'خطأ',
            detail: 'حدث خطأ أثناء تحميل البيانات'
          });
        }
      });
  }

  onDelete(id: number): void {
    if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      this.inventoryService.deleteMaterial(id)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'تم بنجاح',
              detail: 'تم حذف المادة الخام'
            });
            this.loadMaterials(this.currentPage);
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'خطأ',
              detail: 'حدث خطأ أثناء حذف العنصر'
            });
          }
        });
    }
  }

  onPageChange(event: any): void {
    this.loadMaterials(event.page + 1);
  }

  getUnitLabel(unit: number | null): string {
    return unit ? MaterialUnitLabels.get(unit) || '-' : '-';
  }


  onEdit(id: number): void {
    this.router.navigate(['/warehouse/inventory/add', id]);
  }
}
