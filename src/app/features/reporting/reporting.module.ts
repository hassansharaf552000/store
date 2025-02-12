import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';

import { ReportingRoutingModule } from './reporting-routing.module';
import { ReportingComponent } from './reporting.component';
import { PurchaseReportsComponent } from './components/purchase-reports/purchase-reports.component';

@NgModule({
  declarations: [
    ReportingComponent,
    PurchaseReportsComponent
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    ChartModule,
    ButtonModule,
    ProgressBarModule,
    TooltipModule
  ]
})
export class ReportingModule { }
