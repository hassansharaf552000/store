import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporting',
  standalone: false,
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent {
  constructor(private router: Router) {}

  reportingText = {
    title: 'لوحة التقارير',
    purchaseReports: 'تقارير المشتريات',
    purchaseDescription: 'عرض التحليلات والإحصاءات التفصيلية لأوامر الشراء',
    salesReports: 'تقارير المبيعات',
    comingSoon: 'قريباً...',
    viewReports: 'عرض التقارير'
  };

  navigateToPurchaseReports() {
    this.router.navigate(['/reporting/purchase-reports']);
  }
}
