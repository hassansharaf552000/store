import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  template: `
    <div class="layout-wrapper">
      <app-navbar></app-navbar>
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      width: 100%;
      overflow-x: hidden;
    }

    .main-content {
      margin-top: 60px;
      margin-right: 170px;
      padding: 20px;
      width: calc(100% - 170px);
      min-height: calc(100vh - 60px);
      box-sizing: border-box;
    }

    @media (max-width: 768px) {
      .main-content {
        margin-right: 0;
        width: 100%;
      }
    }
  `]
})
export class MainLayoutComponent {}
