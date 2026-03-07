import { Component } from '@angular/core';
import { AddressCart } from '../../shared/address-cart/address-cart';
import { CartItems } from '../../shared/cart-items/cart-items';
import {MatDivider} from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../State/Order/order.service';
import{ select, Store} from '@ngrx/store'
import { AppState } from '../../../Models/AppState';
import { PaymentService } from '../../../State/payment/payment.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone:true,
  imports: [AddressCart,CartItems,MatDivider,CommonModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {

  products=[1,1,1]
  order:any; 
  

constructor(private activatedRoute:ActivatedRoute,
  private orderService:OrderService,
  private store:Store<AppState>,
  private paymentService:PaymentService,
  private cdr: ChangeDetectorRef
){}

  ngOnInit(){

        let id=this.activatedRoute.snapshot.paramMap.get("id")
        if(id){
          this.orderService.getOrderById(id);
        }

        this.store.pipe(select(store=>store.order)).subscribe((order)=>{
          this.order=order.order

           this.cdr.detectChanges(); 
        })
  }


  redirectToPayment= ()=>{
   if(this.order.id){
    this.paymentService.createPayment(this.order.id)
   }

  }

}
