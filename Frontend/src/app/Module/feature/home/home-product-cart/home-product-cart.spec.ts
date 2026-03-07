import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductCart } from './home-product-cart';

describe('HomeProductCart', () => {
  let component: HomeProductCart;
  let fixture: ComponentFixture<HomeProductCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProductCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProductCart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
