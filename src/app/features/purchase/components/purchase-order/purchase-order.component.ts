import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PurchaseService } from '../../services/purchase.service';
import { Router } from '@angular/router';
import { UnitService } from '../../../../shared/services/unit.service';
import { SupplierService } from '../../../../shared/services/supplier.service';

@Component({
  selector: 'app-purchase-order',
  standalone: false,
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {
  purchaseOrderForm: FormGroup;
  suppliers: any[] = [];
  itemsList: any[] = [];
  units: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private purchaseService: PurchaseService,
    private router: Router,
    private supplierService: SupplierService,
    private unitService: UnitService
  ) {
    this.purchaseOrderForm = this.fb.group({
      supplier: [null, Validators.required],
      orderDate: [new Date(), Validators.required],
      items: this.fb.array([]),
    });

    this.addItem();
    document.dir = 'rtl'; // Set RTL direction
  }

  ngOnInit() {
    this.loadSuppliers();
    this.loadUnits();
  }

  loadSuppliers() {
    this.loading = true;
    this.supplierService.getSuppliers().subscribe({
      next: (response) => {
        this.suppliers = response.results.map((supplier: any) => ({
          label: supplier.name,
          value: supplier.id
        }));
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل الموردين'
        });
        this.loading = false;
      }
    });
  }

  loadUnits() {
    this.loading = true;
    this.unitService.getUnits().subscribe({
      next: (response) => {
        this.units = response.map((unit: any) => ({
          label: unit.name,
          value: unit.id
        }));
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل الوحدات'
        });
        this.loading = false;
      }
    });
  }

  get items(): FormArray {
    return this.purchaseOrderForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(
      this.fb.group({
        itemName: [null, Validators.required],
        unit: ["", Validators.required],
        quantity: [1, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]],
        unitPrice: [null, [Validators.required, Validators.min(0.1), Validators.pattern('^[0-9]*\.?[0-9]+$')]]
      })
    );
  }

  removeItem(index: number) {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    } else {
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'تحذير', 
        detail: 'مطلوب عنصر واحد على الأقل' 
      });
    }
  }

  calculateTotalPrice(index: number): number {
    const item = this.items.at(index).value;
    return item.quantity * item.unitPrice;
  }

  isFormValid(): boolean {
    if (!this.purchaseOrderForm.valid) return false;
    
    // Check if items array is not empty and all items are valid
    const items = this.items.controls;
    if (items.length === 0) return false;
    
    return items.every(item => 
      item.get('itemName')?.valid && 
      item.get('quantity')?.valid && 
      item.get('unitPrice')?.valid
    );
  }

  onSubmit() {
    if (this.purchaseOrderForm.valid) {
      console.log('تم تقديم أمر الشراء:', this.purchaseOrderForm.value);
      this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'تم تقديم أمر الشراء' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'يرجى ملء جميع الحقول المطلوبة' });
    }
  }

  goBack() {
    this.router.navigate(['/main/purchase']);
  }
}

