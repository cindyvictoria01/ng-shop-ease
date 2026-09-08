import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  LucideAngularModule,
  Search,
  ShoppingCart,
  User,
  LogOut,
} from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { CartService } from '../../core/services/cart.service';
import { ToastService } from '../toast/toast.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly Search = Search;
  readonly ShoppingCart = ShoppingCart;
  readonly User = User;
  readonly LogOut = LogOut;

  showUserMenu = false;
  searchControl = new FormControl('');

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  cartCount$ = this.cartService.cartCount$;

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    this.authService.logout();
    this.toastService.success('Logout successful');
    this.router.navigate(['/login']);
  }
}
