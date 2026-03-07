import { Component } from '@angular/core';
import { OrderService } from '../../../State/Order/order.service';
import { PaymentService } from '../../../State/payment/payment.service';
import { ActivatedRoute } from '@angular/router';
import {select, Store} from '@ngrx/store';
import { AppState } from '../../../Models/AppState';
import { CommonModule } from '@angular/common';
import { AddressCart } from '../../shared/address-cart/address-cart';


@Component({
  selector: 'app-payment-success',
  standalone:true,
  imports: [CommonModule,AddressCart],
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.css',
})
export class PaymentSuccess {

   orderId:any
   paymentId:any
   order:any

  constructor(private orderService:OrderService,
    private paymentService:PaymentService,
    private route:ActivatedRoute,
    private store:Store<AppState>
  ){

  }


  ngOnInit(){
      this.route.queryParams.subscribe((params)=>{
      this.orderId=params["order_id"]
      this.paymentId=params["razorpay_payment_id"]
    })
    this.orderService.getOrderById(this.orderId);
    this.paymentService.updatePayment({
      orderId:this.orderId,
      paymentId:this.paymentId
    })
  
  this.store.pipe(select(store=>store.order)).subscribe((order)=>{
    this.order=order.order
  })

}
}
