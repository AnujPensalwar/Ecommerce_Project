import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTracker } from '../../shared/order-tracker/order-tracker';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../State/Order/order.service';
import {select, Store} from '@ngrx/store';
import { AppState } from '../../../Models/AppState';
import { OrderCard } from '../order/order-card/order-card';
import { AddressCart } from '../../shared/address-cart/address-cart';


@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, OrderTracker,OrderCard,AddressCart],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit {

  order: any;
  activeStep: number = 0;

  steps = [
    { id: 0, title: "PLACED", isCompleted: false },
    { id: 1, title: "CONFIRMED", isCompleted: false },
    { id: 2, title: "SHIPPED", isCompleted: false },
    { id: 3, title: "DELIVERED", isCompleted: false }
  ];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private store:Store<AppState>
  ) {}

 ngOnInit() {

  this.route.paramMap.subscribe(params => {

    const id = params.get('id');

    if(id){
      this.orderService.getOrderById(id);
    }

  });

  this.store.pipe(select(store => store.order))
    .subscribe((orderState) => {

      if(orderState?.order) {

        this.order = orderState.order;

        this.updateTracker(this.order.orderStatus);

      }

    });

}



  updateTracker(status: string) {

    switch(status) {
     
      case 'PLACED':
      case 'PENDING':
        this.activeStep = 0;
        break;

      case 'CONFIRMED':
        this.activeStep = 1;
        break;

      case 'SHIPPED':
        this.activeStep = 2;
        break;

      case 'DELIVERED':
        this.activeStep = 3;
        break;

      case 'CANCELLED':
        this.activeStep = -1;
        break;
    }

    this.steps.forEach(step => {
      step.isCompleted = step.id <= this.activeStep;
    });

  }

}
