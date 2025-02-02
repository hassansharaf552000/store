import { Component, OnInit } from '@angular/core';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  // Business Modules
  { path: '/purchase', title: 'Purchase', icon: 'nc-cart-simple', class: '' },
  { path: '/production', title: 'Production', icon: 'nc-cog', class: '' },
  { path: '/warehouse', title: 'Warehouse', icon: 'nc-box', class: '' },
  { path: '/accounting', title: 'Accounting', icon: 'nc-credit-card', class: '' },
  { path: '/orders', title: 'Orders', icon: 'nc-box', class: '' },
  { path: '/reporting', title: 'Reporting', icon: 'nc-chart-bar-32', class: '' },
  // User Profile and Settings
  { path: '/profile', title: 'Profile', icon: 'nc-single-02', class: '' },
  { path: '/settings', title: 'Settings', icon: 'nc-settings', class: '' },

];
@Component({
  selector: 'app-sidebar',
  standalone: false,
  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  public menuItems!: RouteInfo[];

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
