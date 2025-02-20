import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: false,  // Change this to false since we're using it in a module
  template: `
    <div class="spinner-overlay" *ngIf="spinnerService.isLoading$ | async">
      <div class="spinner-container">
        <div class="spinner"></div>
      </div>
    </div>
  `,
  styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid #f3f3f3;
      border-top: 5px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class SpinnerComponent {
  constructor(public spinnerService: SpinnerService) {}
}
