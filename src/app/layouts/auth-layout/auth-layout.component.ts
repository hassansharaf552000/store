import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  standalone: false,
  template: `<router-outlet></router-outlet>`,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
    }
  `]
})
export class AuthLayoutComponent {}
