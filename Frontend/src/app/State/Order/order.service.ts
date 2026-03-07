import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of} from 'rxjs';


import{
    createOrderFailure,
    createOrderSuccess,
    getOrderByIdFailure,
    getOrderByIdSuccess,
    getOrderHistoryFailure,
    getOrderHistoryRequest,
    getOrderHistorySuccess,
    getUserOrdersFailure,
    getUserOrdersSuccess,
}
from './order.action';
import { BASE_API_URL } from '../../config/api';

@Injectable({
        providedIn: 'root',
})

export class OrderService {
          private API_BASE_URL=BASE_API_URL;
          private headers;

     constructor(
        private store: Store,
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute
){
       this.headers = new HttpHeaders({
           'Content-Type': 'application/json',
           Authorization: `Bearer ${localStorage.getItem('jwt')}`, 
        });
}


      createOrder(reqData: any) {
             console.log('create order', reqData);
            const url = `${this.API_BASE_URL}/api/orders/`;

            return this.http
            .post(url, reqData, {headers: this.headers })
             .pipe(
                map((data: any) => {
                  
                  if (data.id && reqData) {
                      this.router.navigate([`/checkout/payment/${data.id}`], {
                         queryParams: { step: '3', order_id: data.id },
                         });
                  }
                   console.log('created order-', data);
                   return createOrderSuccess({ order: data });
                }),

                catchError((error: any) => {
                    console.log('catch error:', error);
                         return of (
                           createOrderFailure(
                                error.response && error.response.data.message ? 
                                error.response.data.message 
                                : error.message
                           )
                        );
                })
             ).subscribe((action)=> this.store.dispatch(action));
      }

      getOrderById(orderId: string) {
             console.log('get order req', orderId);
             const url = `${this.API_BASE_URL}/api/orders/${orderId}`;

                 return this.http
                    .get(url, { headers: this.headers })
                    .pipe(
                     map((data: any) => {
                     console.log('order by id', data);
                     return getOrderByIdSuccess({order: data });
                }),
                catchError((error: any) => {
                     console.log('catch', error);
                       return of (
                              getOrderByIdFailure(
                              error.response && error.response.data.message
                               ? error.response.data.message
                              : error.message
                              )
                       );
                    })
                    ).subscribe((action)=> this.store.dispatch(action));
                }

      getOrderHistory() {
                    const url = `${this.API_BASE_URL}/api/orders/user`;

                    return this.http
                       .get(url, {headers: this.headers})
                       .pipe(
                        map((data) => {
                            console.log('order history', data);
                            return getOrderHistorySuccess({ orders: data });
                         }),
                          catchError((error: any) => {
                              
                            return of (
                              getOrderHistoryFailure(
                              error.response && error.response.data.message
                               ? error.response.data.message
                              : error.message
                              )
                            );
                        })
                       ).subscribe((action)=> this.store.dispatch(action));
                 }

    getUserOrders() {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      'Content-Type': 'application/json'
    });

    return this.http
      .get(`${this.API_BASE_URL}/api/orders/user`, { headers })
      .pipe(
        map((data: any) => {
          console.log("User Orders 👉", data);
          return getUserOrdersSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(getUserOrdersFailure({ error: error.message }));
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }   
  
  


}