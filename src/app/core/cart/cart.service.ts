import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { Product } from '../../features/products/models/product.model';
import { CartItem } from '../../features/cart/models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly storageKey = 'shop-ease-cart';

  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());

  cartItems$ = this.cartItemsSubject.asObservable();

  cartCount$ = this.cartItems$.pipe(
    map((items) => items.reduce((total, item) => total + item.quantity, 0)),
  );

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.value;

    const existingItem = currentItems.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      existingItem.quantity += 1;
      this.updateCart([...currentItems]);
      return;
    }

    this.updateCart([
      ...currentItems,
      {
        product,
        quantity: 1,
      },
    ]);
  }

  increaseQuantity(productId: number): void {
    const currentItems = this.cartItemsSubject.value;

    const updatedItems = currentItems.map((item) => {
      if (item.product.id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    this.updateCart(updatedItems);
  }

  decreaseQuantity(productId: number): void {
    const currentItems = this.cartItemsSubject.value;

    const updatedItems = currentItems
      .map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    this.updateCart(updatedItems);
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItemsSubject.value;

    const updatedItems = currentItems.filter(
      (item) => item.product.id !== productId,
    );

    this.updateCart(updatedItems);
  }

  private updateCart(items: CartItem[]): void {
    this.cartItemsSubject.next(items);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  private loadCart(): CartItem[] {
    const savedCart = localStorage.getItem(this.storageKey);

    if (!savedCart) {
      return [];
    }

    try {
      return JSON.parse(savedCart);
    } catch {
      return [];
    }
  }
}
