import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart = this.cartService.cart; 
  totals = this.cartService.calculateTotal(); 

  constructor(private cartService: CartService,private router: Router) {}

  increaseQuantity(productId: number): void {
    const currentCart = this.cart();
    const product = currentCart.find((item) => item.id === productId);
    if (product) {
      this.cartService.updateQuantity(productId, product.quantity + 1);
      this.updateTotals();
    }
  }

  decreaseQuantity(productId: number): void {
    const currentCart = this.cart();
    const product = currentCart.find((item) => item.id === productId);
    if (product && product.quantity > 1) {
      this.cartService.updateQuantity(productId, product.quantity - 1);
      this.updateTotals();
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.updateTotals();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.updateTotals();
  }

  navigateToProductList() {
    this.router.navigate(['/']);
  }

  private updateTotals(): void {
    this.totals = this.cartService.calculateTotal();
  }
}
