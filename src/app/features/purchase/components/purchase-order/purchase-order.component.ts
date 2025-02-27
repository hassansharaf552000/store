import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PurchaseService } from '../../services/purchase.service';
import { Router } from '@angular/router';
import { UnitService } from '../../../../shared/services/unit.service';
import { SupplierService } from '../../../../shared/services/supplier.service';
import { InventoryService } from '../../../warehouse/services/inventory.service';
import { PurchaseOrder, CreatePurchaseOrderRequest } from '../../models/purchase-order.interface';

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
  rawMaterials: any[] = [];  // Add this property
  loading = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private purchaseService: PurchaseService,
    private router: Router,
    private supplierService: SupplierService,
    private unitService: UnitService,
    private inventoryService: InventoryService  // Add this service
  ) {
    this.purchaseOrderForm = this.fb.group({
      supplier: ["", Validators.required],
      orderDate: [new Date(), Validators.required],
      items: this.fb.array([]),
    });

    this.addItem();
    document.dir = 'rtl'; // Set RTL direction
  }

  ngOnInit() {
    this.loadSuppliers();
    this.loadUnits();
    this.loadRawMaterials();  // Add this call
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

  // Add this new method
  loadRawMaterials() {
    this.loading = true;
    this.inventoryService.getAllMaterials().subscribe({
      next: (response) => {
        this.rawMaterials = response.results.map((material: any) => ({
          label: material.name,
          value: material.id
        }));
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل المواد الخام'
        });
        this.loading = false;
      }
    });
  }

  get items(): FormArray {
    return this.purchaseOrderForm.get('items') as FormArray;
  }

  // Modify the addItem method to use rawMaterials dropdown
  addItem() {
    this.items.push(
      this.fb.group({
        itemName: ["", Validators.required],  // This will now be a dropdown of raw materials
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
      this.loading = true;
      
      // Transform form data to match API requirements
      const formValue = this.purchaseOrderForm.value;
      const purchaseOrder: CreatePurchaseOrderRequest = {
        supplier_id: formValue.supplier,
        raw_materials: formValue.items.map((item: any) => ({
          raw_material_id: parseInt(item.itemName),
          quantity: parseInt(item.quantity),
          unit_price: parseFloat(item.unitPrice)
        }))
      };

      this.purchaseService.createOrder(purchaseOrder).subscribe({
        next: (response) => {
          this.messageService.add({ 
            severity: 'success', 
            summary: 'نجاح', 
            detail: 'تم إنشاء أمر الشراء بنجاح' 
          });
          this.loading = false;
          this.router.navigate(['/main/purchase']); // Navigate back to purchase list
        },
        error: (error) => {
          console.error('Error creating purchase order:', error);
          this.messageService.add({ 
            severity: 'error', 
            summary: 'خطأ', 
            detail: 'حدث خطأ أثناء إنشاء أمر الشراء' 
          });
          this.loading = false;
        }
      });
    } else {
      // Show validation errors
      this.messageService.add({ 
        severity: 'error', 
        summary: 'خطأ', 
        detail: 'يرجى ملء جميع الحقول المطلوبة' 
      });
      
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.purchaseOrderForm.controls).forEach(key => {
        const control = this.purchaseOrderForm.get(key);
        control?.markAsTouched();
      });
      
      // Mark all item fields as touched
      this.items.controls.forEach(control => {
        Object.keys((control as FormGroup).controls).forEach(key => {
          control.get(key)?.markAsTouched();
        });
      });
    }
  }

  goBack() {
    this.router.navigate(['/main/purchase']);
  }
}

