import { Component, OnInit } from '@angular/core';
import { MaterialOrderService } from '../../../production/services/material-order.service';
import { PurchaseOrder, PurchaseResponse } from '../../../purchase/models/purchase-order.interface';
import { MessageService } from 'primeng/api';
import { firstValueFrom, forkJoin } from 'rxjs';

@Component({
  selector: 'app-entry-raw-materials',
  standalone: false,
  templateUrl: './entry-raw-materials.component.html',
  styleUrl: './entry-raw-materials.component.scss',
  providers: [MessageService]
})
export class EntryRawMaterialsComponent implements OnInit {
  materialOrders: any[] = [];
  expandedRows: { [key: string]: boolean } = {};
  selectedMaterials: Set<number> = new Set();
  isSubmitting = false;

  constructor(
    private materialOrderService: MaterialOrderService,
    private messageService: MessageService
  ) {}

  toggleMaterials(orderId: number): void {
    this.expandedRows[orderId] = !this.expandedRows[orderId];
  }

  isSelected(material: any): boolean {
    // Handle both direct ID and material object cases
    const materialId = typeof material === 'number' ? material : material?.raw_material?.id;
    return materialId ? this.selectedMaterials.has(materialId) : false;
  }

  toggleSelection(material: any): void {
    // Handle both direct ID and material object cases
    const materialId = typeof material === 'number' ? material : material?.raw_material?.id;
    
    if (!materialId) {
      console.error('Invalid material:', material);
      return;
    }

    console.log('Toggling inner material ID:', materialId);
    if (this.selectedMaterials.has(materialId)) {
      this.selectedMaterials.delete(materialId);
    } else {
      this.selectedMaterials.add(materialId);
    }
  }

  getStatusSeverity(status: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warn';
      case 'cancelled':
        return 'danger';
      default:
        return 'info';
    }
  }

  ngOnInit() {
    this.loadMaterialOrders();
    this.materialOrders = this.materialOrders.map(order => ({
      ...order,
      raw_materials: order.raw_materials.map((material: any) => ({
        ...material,
        selected: this.isSelected(material)
      }))
    }));
  }

  loadMaterialOrders() {
    this.materialOrderService.getMaterialOrders().subscribe({
      next: (response: PurchaseResponse) => {
        this.materialOrders = response.results;
        console.log('Loaded orders:', this.materialOrders);
      },
      error: (error) => {
        console.error('Error loading material orders:', error);
      }
    });
  }

  hasSelectedMaterials(): boolean {
    return this.selectedMaterials.size > 0;
  }

  validateSelectedMaterials(): { isValid: boolean; message?: string } {
    if (!this.hasSelectedMaterials()) {
      return { isValid: false, message: 'لم يتم تحديد أي مواد' };
    }

    const invalidOrders = this.materialOrders.filter(order => {
      const selectedMaterials = order.raw_materials.filter(
        (material: any) => this.selectedMaterials.has(material.raw_material.id)  // Changed from material.id
      );
      return selectedMaterials.some((material: any) => material.delivery_status === 'delivered');
    });

    if (invalidOrders.length > 0) {
      return { 
        isValid: false, 
        message: 'بعض المواد المحددة تم تسليمها بالفعل' 
      };
    }

    return { isValid: true };
  }

  submitSelectedMaterials() {
    const validation = this.validateSelectedMaterials();
    if (!validation.isValid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'تنبيه',
        detail: validation.message
      });
      return;
    }

    const orderMaterials = new Map<number, number[]>();
    
    // Log selected materials before processing
    console.log('Selected material IDs:', Array.from(this.selectedMaterials));
    
    this.materialOrders.forEach(order => {
      const selectedMaterialIds = order.raw_materials
        .filter((material: any) => {
          console.log('Checking material:', material);
          return this.selectedMaterials.has(material.raw_material.id);
        })
        .map((material: any) => ({
          raw_material_id: material.raw_material.id,
          material_order_id: material.id
        }));
      
      if (selectedMaterialIds.length > 0) {
        console.log(`Order ${order.id} selected materials:`, selectedMaterialIds);
        orderMaterials.set(order.id, selectedMaterialIds.map((item: any) => item.raw_material_id));
      }
    });

    this.isSubmitting = true;

    const submissions = Array.from(orderMaterials.entries()).map(([orderId, materialIds]) => 
      this.materialOrderService.markMaterialsDelivered(orderId, materialIds)
    );

    // Wait for all submissions to complete
    firstValueFrom(forkJoin(submissions))
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم التحديث',
          detail: 'تم تحديث حالة المواد المحددة بنجاح'
        });
        this.selectedMaterials.clear();
        this.loadMaterialOrders(); // Refresh the list
        console.log('All materials marked as delivered successfully');
      })
      .catch(error => {
        console.error('Submission error details:', {
          error,
          selectedMaterials: Array.from(this.selectedMaterials),
          orderMaterials: Array.from(orderMaterials.entries())
        });
        
        if (error.type === 'ALREADY_DELIVERED') {
          this.messageService.add({
            severity: 'warn',
            summary: 'تنبيه',
            detail: error.message,
            life: 5000
          });
          this.selectedMaterials.clear();
          this.loadMaterialOrders();
        } else if (error.type === 'API_ERROR') {
          this.messageService.add({
            severity: 'error',
            summary: 'خطأ في الخادم',
            detail: 'حدث خطأ أثناء محاولة تحديث حالة المواد. الرجاء المحاولة مرة أخرى'
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'خطأ',
            detail: 'حدث خطأ أثناء تحديث حالة المواد'
          });
        }
        console.error('Submission error:', error);
      })
      .finally(() => {
        this.isSubmitting = false;
      });
  }
}
