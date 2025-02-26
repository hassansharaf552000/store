import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { AddToInventoryComponent } from './components/add-to-inventory/add-to-inventory.component';
import { EntryRawMaterialsComponent } from './components/entry-raw-materials/entry-raw-materials.component';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    WarehouseComponent,
    InventoryComponent,
    AddToInventoryComponent,
    EntryRawMaterialsComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    TableModule,
    ToastModule,
    TagModule,
    TableModule,
    TagModule,
    CheckboxModule,
    RippleModule,
    FormsModule,
    ButtonModule,

  ]
})
export class WarehouseModule { }
