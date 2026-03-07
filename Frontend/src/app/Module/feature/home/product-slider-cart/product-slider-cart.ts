import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeProductCart } from '../home-product-cart/home-product-cart';



@Component({
  selector: 'app-product-slider-cart',
  standalone:true,
  imports: [HomeProductCart,CommonModule],
  templateUrl: './product-slider-cart.html',
  styleUrl: './product-slider-cart.css',
})
export class ProductSliderCart {
    @Input() title:any
    @Input() products:any[] = [];
}
