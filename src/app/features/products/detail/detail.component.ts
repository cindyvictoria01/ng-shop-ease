import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArrowLeft, LucideAngularModule, Star } from 'lucide-angular';

import { Product, ProductService } from '../product.service';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, LucideAngularModule],
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  readonly ArrowLeft = ArrowLeft;
  readonly Star = Star;

  product?: Product;

  isLoading = true;
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
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
}
