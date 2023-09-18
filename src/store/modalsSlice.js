import {createSlice} from "@reduxjs/toolkit"

const modalsSlice=createSlice({
    name:'modal',
    initialState:{
        modalBasketOpen:false,
    },
    reducers:{
        toggleModalState(state,action){
            switch(action.payload.Type){
                case 'modalBasket':state.modalBasketOpen=!state.modalBasketOpen;
                break;
            }
        }
    }
})

export default modalsSlice.reducer;
export const {toggleModalState}=modalsSlice.actions