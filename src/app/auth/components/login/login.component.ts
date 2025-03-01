import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { User, UserType } from '../../../shared/models/user.model';

@Component({
  selector: 'app-login',
  standalone: false, 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  routeTo : {[key: string]: string} = {
    [UserType.accountant]: '/main/accounting',
    [UserType.warehouse]: '/main/warehouse',
    [UserType.production_manager]: '/main/production',
    [UserType.purchase_manager]: '/main/purchase'
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Redirect if already logged in
    // if (localStorage.getItem('token')) {
    //   this.router.navigate(['/']);
    // }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const credentials = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'نجاح',
            detail: 'تم تسجيل الدخول بنجاح'
          });
          // localStorage.setItem('token', response.token);
          // localStorage.setItem('user', JSON.stringify(response.user));
          this.loading = false;
          const localStorageUser = localStorage.getItem('user') || '{}';
          const loggedInUser = localStorageUser !== '{}' ? JSON.parse(localStorageUser) : null;
          if (loggedInUser) {
            this.router.navigate([this.routeTo[loggedInUser.type]]);
          }

        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'خطأ',
            detail: 'اسم المستخدم أو كلمة المرور غير صحيحة'
          });
          this.loading = false;
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'خطأ',
        detail: 'يرجى ملء جميع الحقول المطلوبة'
      });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return 'هذا الحقل مطلوب';
      }
      if (field.errors['minlength']) {
        return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      }
    }
    return '';
  }
}
