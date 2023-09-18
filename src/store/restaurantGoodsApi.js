import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query";

export const restaurantGoodsApi=createApi({
  reducerPath:'restaurantApi',
    baseQuery:fetchBaseQuery({baseUrl:"https://localhost:7071/"}),
    endpoints:(builder) =>({
        getDishes: builder.query({
           query:()=> `api/Dish`,
        })
    })
})

export const {useGetDishesQuery}=restaurantGoodsApi