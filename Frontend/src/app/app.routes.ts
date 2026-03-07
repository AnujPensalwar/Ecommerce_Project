import { Routes } from '@angular/router';
import { Home } from './Module/feature/home/home';
import { Products } from './Module/feature/products/products';
import { Cart } from './Module/feature/cart/cart';
import { ProductDetails } from './Module/feature/product-details/product-details';
import { Checkout } from './Module/feature/checkout/checkout';
import { Payment } from './Module/feature/payment/payment';
import { PaymentSuccess } from './Module/feature/payment-success/payment-success';
import { Order } from './Module/feature/order/order';
import { OrderDetails } from './Module/feature/order-details/order-details';

import { adminGuard } from './admin.guard';


export const routes: Routes = [
    {path:"admin",loadChildren:()=>import("./Module/admin/admin-routing-module").then(m=>m.AdminRoutingModule),canActivate: [adminGuard]},
    {path:"",component:Home},
    {path:"cart",component:Cart},
    {path:"product-details/:id",component:ProductDetails},
    {path:"checkout",component:Checkout},
    {path:"checkout/payment/:id",component:Payment},
    {path: ':topLevel/:secondLevel/:thirdLevel',component:Products},
    {path:"payment-success",component:PaymentSuccess},
    {path:"account/orders",component:Order},
    {path:"order/:id",component:OrderDetails}
    
];
