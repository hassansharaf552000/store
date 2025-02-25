import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    SpinnerComponent,
   NotfoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastModule,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    SpinnerComponent,
    ToastModule,
    NotfoundComponent
  ],
  providers: [
    MessageService
  ]
})
export class SharedModule { }
