import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'purchase', loadChildren: () => import('./features/purchase/purchase.module').then(m => m.PurchaseModule) },
      { path: 'production', loadChildren: () => import('./features/production/production.module').then(m => m.ProductionModule) },
      { path: 'warehouse', loadChildren: () => import('./features/warehouse/warehouse.module').then(m => m.WarehouseModule) },
      { path: 'accounting', loadChildren: () => import('./features/accounting/accounting.module').then(m => m.AccountingModule) },
      { path: 'orders', loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule) },
      { path: 'reporting', loadChildren: () => import('./features/reporting/reporting.module').then(m => m.ReportingModule) },
      { path: '', redirectTo: '/purchase', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
    ]
  },
  { path: '**', redirectTo: '/purchase' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
