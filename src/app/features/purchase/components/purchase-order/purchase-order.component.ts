import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PurchaseOrderService } from '../../services/purchase-order.service';

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

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private purchaseOrderService: PurchaseOrderService
  ) {
    this.purchaseOrderForm = this.fb.group({
      supplier: [null, Validators.required],
      orderDate: [new Date(), Validators.required],
      items: this.fb.array([]),
    });

    this.addItem();
  }

  ngOnInit() {

  }

  get items(): FormArray {
    return this.purchaseOrderForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(
      this.fb.group({
        itemName: [null, Validators.required],
        unit: [null, Validators.required],
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
        summary: 'Warning', 
        detail: 'At least one item is required' 
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
      console.log('Purchase Order Submitted:', this.purchaseOrderForm.value);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Purchase Order Submitted' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
    }
  }
}

