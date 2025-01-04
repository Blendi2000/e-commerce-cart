import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockCartService: jasmine.SpyObj<CartService>;

  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      price: 257.31,
      category: 'Home Appliances',
      description: 'This is a description for Product 1 in the Home Appliances category.',
      image: 'https://dummyimage.com/200x200/000/fff&text=Product+1',
      discount: '10%',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 252.26,
      category: 'Automotive',
      description: 'This is a description for Product 2 in the Automotive category.',
      image: 'https://dummyimage.com/200x200/000/fff&text=Product+2',
      discount: '25%',
    },
  ];

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['fetchProducts'], {
      products: jasmine.createSpyObj('WritableSignal', ['set']),
    });
    mockCartService = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ProductListComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should fetch products and apply discounts', () => {
    mockProductService.fetchProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(mockProductService.fetchProducts).toHaveBeenCalled();
    expect(mockProductService.products.set).toHaveBeenCalledWith([
      {
        id: 1,
        name: 'Product 1',
        price: 231.579, // Discount applied
        category: 'Home Appliances',
        description: 'This is a description for Product 1 in the Home Appliances category.',
        image: 'https://dummyimage.com/200x200/000/fff&text=Product+1',
        discount: '10%',
        real_price: 257.31,
      },
      {
        id: 2,
        name: 'Product 2',
        price: 189.195, // Discount applied
        category: 'Automotive',
        description: 'This is a description for Product 2 in the Automotive category.',
        image: 'https://dummyimage.com/200x200/000/fff&text=Product+2',
        discount: '25%',
        real_price: 252.26,
      },
    ]);
  });
});
