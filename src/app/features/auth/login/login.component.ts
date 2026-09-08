import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Eye, EyeOff, LoaderCircle, LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/toast/toast.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly LoaderCircle = LoaderCircle;

  showPassword = false;
  loginError = false;
  isLoading = false;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginError = false;
    this.isLoading = true;

    const { email, password } = this.loginForm.value;

    this.authService
      .login(email, password)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: (user) => {
          if (user) {
            this.authService.setLoggedIn();
            this.toastService.success('Login successful');
            this.router.navigate(['/home']);
          } else {
            this.loginError = true;
            this.toastService.error('Login failed');
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.loginError = true;
          this.toastService.error('Login failed');
        },
      });
  }
}
