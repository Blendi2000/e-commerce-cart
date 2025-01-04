import { Injectable, signal } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartState = signal<CartItem[]>([]);

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartState.set(JSON.parse(storedCart));
    }
  }

  get cart() {
    return this.cartState.asReadonly();
  }

  addToCart(product: CartItem): void {
    const currentCart = this.cartState();
    const existingProduct = currentCart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      currentCart.push({ ...product });
    }
    this.cartState.set([...currentCart]);
    this.saveToLocalStorage();
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentCart = this.cartState();
    const product = currentCart.find((item) => item.id === productId);
    if (product) {
      product.quantity = Math.max(1, quantity); // Ensure quantity is at least 1
      this.cartState.set([...currentCart]);
      this.saveToLocalStorage();
    }
  }

  removeFromCart(productId: number): void {
    const updatedCart = this.cartState().filter((item) => item.id !== productId);
    this.cartState.set([...updatedCart]);
    this.saveToLocalStorage();
  }

  clearCart(): void {
    this.cartState.set([]);
    localStorage.removeItem('cart');
  }

  calculateTotal(): { total: number; tax: number; finalTotal: number } {
    const currentCart = this.cartState();
    const total = currentCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = total * 0.15;
    const finalTotal = total  + tax;
    return { total, tax, finalTotal };
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartState()));
  }
}
