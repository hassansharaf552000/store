import { Component, OnInit } from '@angular/core';
import { User, UserType } from '../../models/user.model';

interface RouteInfo {
  path: string;
  title: string;
  titleAr: string; // Add Arabic title
  icon: string;
  class: string;
  permissions?: string[]; // Add permission property
}
export const ROUTES: RouteInfo[] = [
  { path: '/main/dashboard', title: 'Dashboard', titleAr: 'لوحة التحكم', icon: 'home', class:'', permissions: [UserType.accountant,UserType.production_manager,UserType.purchase_manager,UserType.warehouse] }, // Changed to 'home' icon
  { path: '/main//purchase', title: 'Purchase', titleAr: 'الشراء', icon: 'shopping-cart', class: '', permissions: [UserType.purchase_manager] },
  { path: '/main//production', title: 'Production', titleAr: 'الإنتاج', icon: 'cog', class: '', permissions: [UserType.production_manager] },
  { path: '/main//warehouse', title: 'Warehouse', titleAr: 'المستودع', icon: 'box', class: '', permissions: [UserType.warehouse] },
  { path: '/main//accounting', title: 'Accounting', titleAr: 'المحاسبة', icon: 'wallet', class: '', permissions: [UserType.accountant] },
  { path: '/main//orders', title: 'Orders', titleAr: 'الطلبات', icon: 'shopping-bag', class: '', permissions: [''] },
  { path: '/main//reporting', title: 'Reporting', titleAr: 'التقارير', icon: 'chart-bar', class: '', permissions: [UserType.accountant] },
  { path: '/main//user-profile', title: 'Profile', titleAr: 'الملف الشخصي', icon: 'user', class: '', permissions: [UserType.accountant,UserType.production_manager,UserType.purchase_manager,UserType.warehouse] },  // Changed path
  { path: '/main//user-settings', title: 'Settings', titleAr: 'الإعدادات', icon: 'cog', class: '', permissions: [UserType.accountant,UserType.production_manager,UserType.purchase_manager,UserType.warehouse] }  // Changed path
];

@Component({
  selector: 'app-sidebar',
  standalone: false,
  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  public menuItems!: RouteInfo[];
  loggedInUser: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;
  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.outerWidth > 991) {
        return false;
    }
    return true;
};

  // Check if user has permission to access a route
  hasPermission(route_permissions: string[] | undefined): boolean {
    return route_permissions?.includes(this.loggedInUser.type) || false;
  }
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

