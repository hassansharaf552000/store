import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    SpinnerComponent,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class SharedModule { }
