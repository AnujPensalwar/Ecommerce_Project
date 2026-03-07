import { Component } from '@angular/core';
import { CartItems } from '../../shared/cart-items/cart-items';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from '../../../State/cart/cart.service';
import {select, Store} from '@ngrx/store';
import { AppState } from '../../../Models/AppState';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports: [CartItems,CommonModule,MatDividerModule,RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {

  cart:any;
  
  cartItems:any[]=[];


  constructor(private router:Router,
    private cartService:CartService,
    private store:Store<AppState>,
    private cdr:ChangeDetectorRef
  ){

  }

  ngOnInit(){
       this.cartService.getCart()

        this.store.pipe(select(store => store.cart))
    .subscribe((cart) => {

      console.log("FULL CART STATE 👉", cart);
  
     
      this.cartItems = cart.cartItems;
      
        this.cart = cart.cart;
      
       console.log("CART ITEMS 👉", cart?.cartItems);

       
        this.cdr.detectChanges();
       
      
      
    });
  }

  navigateToCheckout(){
    this.router.navigate(["checkout"])
  }

}
