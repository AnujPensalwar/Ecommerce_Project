import { Component } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { OrderCard } from './order-card/order-card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../Models/AppState';
import { OrderService } from '../../../State/Order/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatCheckbox, OrderCard, CommonModule],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {

  orders: any[] = [];

  orderFilter = [
    { value: "on_the_way", label: "On The Way" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "returned", label: "Returned" }
  ];

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private orderService: OrderService
  ) {}

  ngOnInit() {

    this.orderService.getUserOrders();

    this.store.pipe(select(store => store.order))
      .subscribe((orderState) => {
        console.log("ORDER STATE", orderState);
        this.orders = orderState.orders;
      });
  }

  navigateToOrderDetails(id: number) {
    this.router.navigate([`/order/${id}`]);
  }
}
