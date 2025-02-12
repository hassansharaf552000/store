import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportingComponent } from './reporting.component';
import { PurchaseReportsComponent } from './components/purchase-reports/purchase-reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportingComponent
  },
  {
    path: 'purchase-reports',
    component: PurchaseReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule { }
