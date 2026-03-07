import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-home-product-cart',
  standalone:true,
  imports: [],
  templateUrl: './home-product-cart.html',
  styleUrl: './home-product-cart.css',
})
export class HomeProductCart {

  @Input() product:any;

  constructor(private router: Router){}

  navigate(){
    this.router.navigate(['/product-details',this.product.id])
  }


}
