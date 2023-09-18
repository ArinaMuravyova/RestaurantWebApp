import {combineReducers, configureStore} from '@reduxjs/toolkit'
import dishReducer from './dishSlice'
import modalsSlice from "./modalsSlice";
import orderReducer from './orderSlice';
import { setupListeners } from '@reduxjs/toolkit/query'
import { enableMapSet } from 'immer';
import {restaurantGoodsApi} from "./restaurantGoodsApi";

// enableMapSet()
export const rootReducer=combineReducers({
    dish:dishReducer,
    modal:modalsSlice,
    order:orderReducer,
})
export const store=configureStore({
        reducer: rootReducer,
            // [restaurantGoodsApi.reducerPath]: restaurantGoodsApi.reducer,
        // },
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(restaurantGoodsApi.middleware),
})
setupListeners(store.dispatch)
