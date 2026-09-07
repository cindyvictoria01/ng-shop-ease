import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-angular';

import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Product, ProductService } from '../products/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink, LucideAngularModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  readonly ShoppingBag = ShoppingBag;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly Star = Star;

  products: Product[] = [];
  slides: Product[] = [];

  currentSlide = 0;

  isLoading = true;
  hasError = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.products;
        this.slides = response.products.slice(0, 3);

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load products:', error);

        this.isLoading = false;
        this.hasError = true;
      },
    });
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
