import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSliderCart } from './product-slider-cart';

describe('ProductSliderCart', () => {
  let component: ProductSliderCart;
  let fixture: ComponentFixture<ProductSliderCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSliderCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSliderCart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
