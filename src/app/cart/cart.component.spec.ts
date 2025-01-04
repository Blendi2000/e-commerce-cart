import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../services/cart.service';
import { RouterTestingModule } from '@angular/router/testing';
import { signal, Signal } from '@angular/core';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockCartService: Partial<CartService>;

  beforeEach(() => {
    const mockCart: Signal<{ id: number; name: string; price: number; quantity: number; image: string }[]> = signal([
      { id: 1, name: 'Mock Item', price: 100, quantity: 2, image: 'mock.png' },
    ]);

    mockCartService = {
      cart: mockCart,
      clearCart: jasmine.createSpy('clearCart'),
      calculateTotal: jasmine.createSpy('calculateTotal').and.returnValue({
        total: 200,
        tax: 30,
        finalTotal: 230,
      }),
      removeFromCart: jasmine.createSpy('removeFromCart'),
      updateQuantity: jasmine.createSpy('updateQuantity'),
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CartComponent],
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call clearCart when the clear button is clicked', () => {
    component.clearCart();
    expect(mockCartService.clearCart).toHaveBeenCalled();
  });

  it('should calculate totals correctly', () => {
    const totals = mockCartService.calculateTotal!();
    expect(totals.total).toBe(200);
    expect(totals.tax).toBe(30);
    expect(totals.finalTotal).toBe(230);
  });

  it('should call removeFromCart when an item is removed', () => {
    component.removeItem(1);
    expect(mockCartService.removeFromCart).toHaveBeenCalledWith(1);
  });

  it('should increase quantity of a product', () => {
    component.increaseQuantity(1);
    expect(mockCartService.updateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('should decrease quantity of a product', () => {
    component.decreaseQuantity(1);
    expect(mockCartService.updateQuantity).toHaveBeenCalledWith(1, 1);
  });
});
