import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCart } from './address-cart';

describe('AddressCart', () => {
  let component: AddressCart;
  let fixture: ComponentFixture<AddressCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressCart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
