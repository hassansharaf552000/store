import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MaterialUnit, MaterialUnitLabels } from '../../models/raw-material.model';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-add-to-inventory',
  standalone: false,
  templateUrl: './add-to-inventory.component.html',
  styleUrls: ['./add-to-inventory.component.scss'],
  providers: [MessageService]
})
export class AddToInventoryComponent implements OnInit {
  inventoryForm: FormGroup;
  isEditMode = false;
  materialId: number = 0;
  pageTitle = 'إضافة مادة خام جديدة'; 
  pageSubTitle = 'إضافة مواد خام جديدة لقاعدة بيانات المخزن'
  submitButtonLabel = 'إضافة للمخزن';
  
  units = Array.from(MaterialUnitLabels.entries()).map(([value, name]) => ({
    name,
    code: value
  }));

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.inventoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      unit: [null, [Validators.required]],
      unit_count: [null, [Validators.required, Validators.min(0), Validators.max(2147483647)]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id && id !== '0') {
      this.isEditMode = true;
      this.materialId = +id;
      this.pageTitle = 'تعديل مادة خام';
      this.pageSubTitle = 'تعديل مادة خام موجودة في قاعدة بيانات المخزن';
      this.submitButtonLabel = 'حفظ التعديلات';
      this.loadMaterial(this.materialId);
    }
  }

  private loadMaterial(id: number): void {
    this.inventoryService.getMaterialById(id).subscribe({
      next: (material) => {
        this.inventoryForm.patchValue({
          name: material.name,
          unit: material.unit,
          unit_count: material.unit_count
        });
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

  onSubmit() {
    if (this.inventoryForm.valid) {
      const request = this.isEditMode ? 
        this.inventoryService.updateMaterial(this.materialId, this.inventoryForm.value) :
        this.inventoryService.createMaterial(this.inventoryForm.value);

      request.subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'تم بنجاح',
            detail: this.isEditMode ? 'تم تحديث المادة الخام' : 'تم إضافة المادة الخام'
          });
          this.router.navigate(['/main/warehouse/inventory']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'خطأ',
            detail: 'حدث خطأ أثناء حفظ البيانات'
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'خطأ',
        detail: 'يرجى ملء جميع الحقول المطلوبة'
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/main/warehouse/inventory']);
  }
}
