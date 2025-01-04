import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProductsJson = [
    {
      id: 1,
      name: 'Product 1',
      price: 257.31,
      category: 'Home Appliances',
      description: 'Description for Product 1',
      image: 'https://dummyimage.com/200x200/000/fff&text=Product+1',
      discount: '10%',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 252.26,
      category: 'Automotive',
      description: 'Description for Product 2',
      image: 'https://dummyimage.com/200x200/000/fff&text=Product+2',
      discount: '25%',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });



  it('should apply discounts correctly', () => {
    const discountedProducts = service.calculateDiscounts(mockProductsJson);
    expect(discountedProducts[0].price).toBeCloseTo(231.58, 2); // 10% discount
    expect(discountedProducts[1].price).toBeCloseTo(189.20, 2); // 25% discount
  });
});
