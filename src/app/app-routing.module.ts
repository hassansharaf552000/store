import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ProfilleComponent } from './features/profille/profille.component';
import { SettingsComponent } from './features/settings/settings.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
      { path: '', redirectTo: '/auth', pathMatch: 'full' }
    ]
  },
  {
    path: 'main',
    component: MainLayoutComponent,
    children: [
      { path: 'purchase', loadChildren: () => import('./features/purchase/purchase.module').then(m => m.PurchaseModule) },
      { path: 'production', loadChildren: () => import('./features/production/production.module').then(m => m.ProductionModule) },
      { path: 'warehouse', loadChildren: () => import('./features/warehouse/warehouse.module').then(m => m.WarehouseModule) },
      { path: 'accounting', loadChildren: () => import('./features/accounting/accounting.module').then(m => m.AccountingModule) },
      { path: 'orders', loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule) },
      { path: 'reporting', loadChildren: () => import('./features/reporting/reporting.module').then(m => m.ReportingModule) },
      {path: 'user-profile',component: ProfilleComponent},
      {path: 'user-settings',component: SettingsComponent},
      {path: 'dashboard',component: DashboardComponent},


    ]
  },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
