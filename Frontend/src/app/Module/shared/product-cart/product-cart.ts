import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-cart',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './product-cart.html',
  styleUrl: './product-cart.css',
})
export class ProductCart {

  @Input() product:any

  constructor(private router:Router){}

  navigate(){
    console.log("CLICKED", this.product?.id);
  this.router.navigate(['/product-details', this.product.id])

}
}
