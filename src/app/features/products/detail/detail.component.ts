import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArrowLeft, LucideAngularModule, PackageX, Star } from 'lucide-angular';

import {
  Product,
  ProductService,
} from '../../../core/services/product.service';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CartService } from '../../../core/services/cart.service';
import { ToastService } from '../../../shared/toast/toast.service';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    LoadingSpinnerComponent,
    LucideAngularModule,
  ],
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly Star = Star;
  readonly PackageX = PackageX;

  product?: Product;

  isLoading = true;
  isAddingToCart = false;
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.hasError = true;
      this.isLoading = false;
      return;
    }

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load product:', error);

        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  addToCart(): void {
    if (!this.product || this.isAddingToCart || this.product.stock <= 0) {
      return;
    }

    this.isAddingToCart = true;

    this.cartService.addToCart();
    this.toastService.success('Added to cart');

    setTimeout(() => {
      this.isAddingToCart = false;
    }, 800);
  }

  getOriginalPrice(): number {
    if (!this.product?.discountPercentage) {
      return this.product?.price ?? 0;
    }

    return this.product.price / (1 - this.product.discountPercentage / 100);
  }
}
