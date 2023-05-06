import {createSlice} from '@reduxjs/toolkit'

const orderSlice=createSlice({
    name:'orders',
    initialState:{
        orders:[],
        
    },
    reducers:{
    addToOrder(state,action){
        let isInArray=false
        let orderItem=state.payload.dish
        state.orders.forEach(el=>{
        if(el.id===action.payload.dish.id){
          isInArray=true;
          state.orders[el.id].amount++;
          console.log(state.orders);
        }
    });
      if(!isInArray){
       state.orders.push(action.payload.dish)
       state.orders[action.payload.dish.id].amount++
       console.log(state.orders)
      }
    },
    deleteOrder(state,action){}
    }
})

export const {addToOrder,deleteOrder}=orderSlice.actions
export default orderSlice.reducer