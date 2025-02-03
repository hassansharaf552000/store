import { Component, OnInit } from '@angular/core';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'home', class: '' }, // Changed to 'home' icon
  { path: '/purchase', title: 'Purchase', icon: 'shopping-cart', class: '' },
  { path: '/production', title: 'Production', icon: 'cog', class: '' },
  { path: '/warehouse', title: 'Warehouse', icon: 'box', class: '' },
  { path: '/accounting', title: 'Accounting', icon: 'wallet', class: '' },
  { path: '/orders', title: 'Orders', icon: 'shopping-bag', class: '' },
  { path: '/reporting', title: 'Reporting', icon: 'chart-bar', class: '' },
  { path: '/user-profile', title: 'Profile', icon: 'user', class: '' },  // Changed path
  { path: '/user-settings', title: 'Settings', icon: 'cog', class: '' }  // Changed path
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
  isMobileMenu() {
    if (window.outerWidth > 991) {
        return false;
    }
    return true;
};

  convertIcon(icon: string): string {
    // Convert material icons to PrimeNG equivalent
    const iconMap: { [key: string]: string } = {
      'nc-cart-simple': 'shopping-cart',
      'nc-cog': 'cog',
      'nc-box': 'box',
      'nc-credit-card': 'wallet',
      'nc-chart-bar-32': 'chart-bar',
      'nc-single-02': 'user',
      'grid': 'home'  // Added mapping for dashboard icon
    };
    return iconMap[icon] || icon;
  }
}

