import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  real_price?:number;
  description: string;
  image: string;
  discount?: string
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = signal<Product[]>([]);

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/products.json');
  }
  
  calculateDiscounts(products: Product[]): Product[] {
    return products.map((product) => {
      if (product.discount) {
        const discountValue = parseFloat(product.discount.replace('%', ''));
        product.real_price = product.price;
        product.price = product.price - (product.price * discountValue) / 100;
      }
      return product;
    });
  }

  getProductById(id: number): Product | undefined {
    return this.products().find((product) => product.id === id);
  }
}
