import { createSlice } from "@reduxjs/toolkit";

const orderSlice= createSlice({
    name:'order',
    initialState:{
        dishesInOrders:[],
        orderSum:0,
        shipping:250,
    },
    reducers:{
        addToOrder(state,action){
            let isAnArray=state.dishesInOrders.map(item=>item.Id).includes(action.payload.Dish.Id)
            if(isAnArray){
                for (let i = 0; i < state.dishesInOrders.length; i++) {
                    if(state.dishesInOrders[i].Id===action.payload.Dish.Id){
                        state.dishesInOrders[i].Amount++
                    }
                }
            }else{
                state.dishesInOrders.push({
                    Id:action.payload.Dish.Id,
                    Name:action.payload.Dish.Name,
                    Cost:action.payload.Dish.Cost,
                    Amount:1,
                    Img:action.payload.Dish.Img})
            }
            state.orderSum+=action.payload.Dish.Cost
            if(state.orderSum>1500)
                state.shipping=0
        },
        deleteFromOrder(state,action){
            let indexToDelete=state.dishesInOrders.map(item=>item.Id).indexOf(action.payload.Dish.Id)
            state.dishesInOrders.splice(indexToDelete,1)

            state.orderSum-=action.payload.Dish.Cost
            if(state.orderSum<=1500)
                state.shipping=250
        },
        decreaseAmount(state,action){
            for (let i = 0; i < state.dishesInOrders.length; i++) {
                if(state.dishesInOrders[i].Id===action.payload.Dish.Id){
                    state.dishesInOrders[i].Amount--
                }
            }

            state.orderSum-=action.payload.Dish.Cost
            if(state.orderSum<=1500)
                state.shipping=250
        },
        increaseAmount(state,action){
            for (let i = 0; i < state.dishesInOrders.length; i++) {
                if(state.dishesInOrders[i].Id===action.payload.Dish.Id){
                    state.dishesInOrders[i].Amount++
                }
            }
            state.orderSum+=action.payload.Dish.Cost
            if(state.orderSum>1500)
                state.shipping=0
        }
    }
})

export default orderSlice.reducer;
export const{
    addToOrder,
    deleteFromOrder,
    decreaseAmount,
    increaseAmount,
}=orderSlice.actions