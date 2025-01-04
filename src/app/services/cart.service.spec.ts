import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    localStorage.clear();
  });

  it('should add a product to the cart', () => {
    const product = { id: 1, name: 'Product 1', price: 100, quantity: 1, image: '' };
    service.clearCart();
  
    service.addToCart(product);
    let cart = service.cart();
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(1);
  
    service.addToCart({ ...product, quantity: 3 });
    cart = service.cart();
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(4); 
  });
  

});
