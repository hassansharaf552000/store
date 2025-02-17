import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

interface MaterialUnit {
  name: string;
  code: string;
}

@Component({
  selector: 'app-add-to-inventory',
standalone: false,
  
  templateUrl: './add-to-inventory.component.html',
  styleUrls: ['./add-to-inventory.component.scss'],
  providers: [MessageService]
})
export class AddToInventoryComponent implements OnInit {
  inventoryForm: FormGroup;
  
  units: MaterialUnit[] = [
    { name: 'متر', code: 'MTR' },
    { name: 'قطعة', code: 'PCS' },
    { name: 'كجم', code: 'KG' },
    { name: 'ياردة', code: 'YRD' }
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.inventoryForm = this.fb.group({
      materialName: ['', [Validators.required]],
      unit: [null, [Validators.required]],  // Changed from '' to null
      quantity: [null, [Validators.required, Validators.min(1)]]  // Changed from '' to null
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.inventoryForm.valid) {
      // TODO: Implement actual API call
      console.log('Form Data:', this.inventoryForm.value);
      this.messageService.add({
        severity: 'success',
        summary: 'تم بنجاح',
        detail: 'تم إضافة المواد للمخزن'
      });
      this.inventoryForm.reset();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'خطأ',
        detail: 'يرجى ملء جميع الحقول المطلوبة'
      });
    }
  }
}
