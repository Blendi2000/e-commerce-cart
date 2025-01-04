import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule,ProductListComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products = this.productService.products; // Signal for product list
  selectedProduct: any = null; // For the modal
  quantity: number = 1; // For the quantity input

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe((fetchedProducts) => {
      const updatedProducts = fetchedProducts.map((product) => {
        if (product.discount) {
          const discountValue = parseFloat(product.discount.replace('%', ''));
          product.real_price = product.price;
          product.price = product.price - (product.price * discountValue) / 100;
        }
        return product;
      });

      this.productService.products.set(updatedProducts);
    });
  }

  openModal(product: any): void {
    this.selectedProduct = product;
    this.quantity = 1; // Reset quantity
  }

  closeModal(): void {
    this.selectedProduct = null;
  }

  addToCart(product: any): void {
    this.cartService.addToCart({ ...product, quantity: this.quantity });
    this.closeModal(); // Close modal after adding to cart
  }
}
