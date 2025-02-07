import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,    
  ],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
  ] 

})
export class SharedModule { }
