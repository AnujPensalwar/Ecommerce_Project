import { Routes } from '@angular/router';
import { Admin } from './admin';
import { Dashboard } from './dashboard/dashboard';
import { AdminProducts } from './admin-products/admin-products';
import { OrderTable } from './order-table/order-table';
import { CreateProduct } from './create-product/create-product';
import { AdminCustomers } from './customers/customers';

export const adminRoutes: Routes = [

  {
    path: '',
    component: Admin,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'products', component: AdminProducts },
      { path: 'orders', component: OrderTable },
      { path: 'customers', component: AdminCustomers },
      { path: 'create-product', component: CreateProduct },
      { path: 'edit-product/:id', component: CreateProduct }
    ]
  }

];
