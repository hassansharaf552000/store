import { Component, OnInit } from '@angular/core';

interface RouteInfo {
  path: string;
  title: string;
  titleAr: string; // Add Arabic title
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/main/dashboard', title: 'Dashboard', titleAr: 'لوحة التحكم', icon: 'home', class: '' }, // Changed to 'home' icon
  { path: '/main//purchase', title: 'Purchase', titleAr: 'الشراء', icon: 'shopping-cart', class: '' },
  { path: '/main//production', title: 'Production', titleAr: 'الإنتاج', icon: 'cog', class: '' },
  { path: '/main//warehouse', title: 'Warehouse', titleAr: 'المستودع', icon: 'box', class: '' },
  { path: '/main//accounting', title: 'Accounting', titleAr: 'المحاسبة', icon: 'wallet', class: '' },
  { path: '/main//orders', title: 'Orders', titleAr: 'الطلبات', icon: 'shopping-bag', class: '' },
  { path: '/main//reporting', title: 'Reporting', titleAr: 'التقارير', icon: 'chart-bar', class: '' },
  { path: '/main//user-profile', title: 'Profile', titleAr: 'الملف الشخصي', icon: 'user', class: '' },  // Changed path
  { path: '/main//user-settings', title: 'Settings', titleAr: 'الإعدادات', icon: 'cog', class: '' }  // Changed path
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

