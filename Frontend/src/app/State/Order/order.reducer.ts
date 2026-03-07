import { createReducer, on, Action } from '@ngrx/store';

import * as OrderActions from './order.action';

export interface OrderState {
        loading: boolean;
        error: string | null;
        order: any | null;
        orders: any[];
}

const initialState: OrderState = {
          loading: false,
          error: null,
          order: null,
          orders: [],
};

export const orderReducer = createReducer(
          initialState,
          on (OrderActions.createOrderRequest,
              OrderActions.getOrderByIdRequest,
              OrderActions.getOrderHistoryRequest,
              OrderActions.getUserOrdersRequest, (state) => ({ 
            ...state,
            loading: true, 
            error: null, 
          })),

            on (OrderActions.createOrderSuccess,
                OrderActions.getOrderByIdSuccess, (state, {order }) => ({ 
                ...state, 
                loading: false, 
                order,
        })),

           on (OrderActions.createOrderFailure,
            OrderActions.getOrderByIdFailure,
            OrderActions.getOrderHistoryFailure,
            OrderActions.getUserOrdersFailure, (state, { error }) => ({ 
                ...state, 
                loading: false, 
                error,
        })),

         on (OrderActions.getOrderHistorySuccess,
                 (state, {orders }) => ({ 
                ...state, 
                loading: false, 
                orders,
        })),


         on(OrderActions.getUserOrdersSuccess, (state, action) => ({
                 ...state,
                loading: false,
                orders: action.payload
        })),

    );