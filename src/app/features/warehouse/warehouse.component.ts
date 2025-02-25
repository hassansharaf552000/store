import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-warehouse',
  standalone: false,
  
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent {
  isSubRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isSubRoute = event.url !== '/main/warehouse';
    });
  }

  navigateTo(route: string) {
    this.router.navigate(['/main/warehouse', route]);
  }
}
