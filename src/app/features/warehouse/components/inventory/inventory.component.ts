import { Component, OnInit } from '@angular/core';

interface InventoryItem {
  id: number;
  materialName: string;
  unit: string;
  quantity: number;
  lastUpdated: Date;
  status: string;
}

@Component({
  selector: 'app-inventory',
standalone: false,
  
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventoryItems: InventoryItem[] = [
    {
      id: 1,
      materialName: 'قماش قطني',
      unit: 'متر',
      quantity: 500,
      lastUpdated: new Date(),
      status: 'متوفر'
    },
    {
      id: 2,
      materialName: 'خيوط بوليستر',
      unit: 'كجم',
      quantity: 100,
      lastUpdated: new Date(),
      status: 'منخفض'
    }
    // Add more mock data as needed
  ];

  statuses: any[] = [
    { label: 'متوفر', value: 'متوفر' },
    { label: 'منخفض', value: 'منخفض' },
    { label: 'نفذت الكمية', value: 'نفذت الكمية' }
  ];

  constructor() { }

  ngOnInit(): void { }

  getStatusSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' {
    switch (status) {
      case 'متوفر':
        return 'success';
      case 'منخفض':
        return 'warn';
      case 'نفذت الكمية':
        return 'danger';
      default:
        return 'info';
    }
  }
}
