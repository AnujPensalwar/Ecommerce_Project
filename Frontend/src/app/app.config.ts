import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideRouterStore } from '@ngrx/router-store';
import { authReducer } from './State/Auth/auth.reducer';
import { userReducer } from './State/user/user.reducer';
import { provideHttpClient } from '@angular/common/http';
import { productReducer } from './State/Product/product.reducer';
import { cartReducer } from './State/cart/cart.reducer';
import { orderReducer } from './State/Order/order.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ auth: authReducer, 
      user: userReducer, 
      product: productReducer, 
      cart: cartReducer,
      order: orderReducer
    }),
    provideRouterStore(), provideHttpClient()
  ]
};
