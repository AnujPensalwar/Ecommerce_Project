import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../State/cart/cart.service';

@Component({
  selector: 'app-cart-items',
  standalone:true,
  imports: [MatIcon,CommonModule],
  templateUrl: './cart-items.html',
  styleUrl: './cart-items.css',
})
export class CartItems {

  @Input() cartItem:any;
  @Input() showButton:any;

constructor(private cartService:CartService,
  private cd: ChangeDetectorRef
  
){}

 updateCartItem(num:number){

  const newQuantity = this.cartItem.quantity + num;

  
  if(newQuantity < 1) return;

  
  const maxStock = this.cartItem.product.quentity;

  if(newQuantity > maxStock) return;

  this.cartService.updateCartItem({
      cartItemId: this.cartItem.id,
      quantity: newQuantity,
  });

  this.cd.detectChanges();
}

  removeCartItem(){

    this.cartService.removeCartItem(this.cartItem.id)
  }
}
