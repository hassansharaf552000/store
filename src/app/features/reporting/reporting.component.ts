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

  navigateToPurchaseReports() {
    this.router.navigate(['/reporting/purchase-reports']);
  }
}
