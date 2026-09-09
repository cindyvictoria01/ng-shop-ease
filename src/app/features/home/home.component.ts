import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-angular';

import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { Product } from '../products/models/product.model';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink, LucideAngularModule],
  templateUrl: './home.component.html',
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        style({
          opacity: 0,
          transform: 'translateX(12px)',
        }),
        animate(
          '500ms ease-out',
          style({
            opacity: 1,
            transform: 'translateX(0)',
          }),
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly ShoppingBag = ShoppingBag;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly Star = Star;

  private autoSlideInterval?: ReturnType<typeof setInterval>;

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

        this.slides = response.products
          .slice()
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);

        this.isLoading = false;

        if (this.slides.length > 1) {
          this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
          }, 3000);
        }
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

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
}
