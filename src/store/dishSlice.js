import { createSlice } from "@reduxjs/toolkit";


const dishSlice = createSlice({
  name: 'dishes',
  initialState: {
    dishes: [],
    dishesInOrders: [],
  },
  reducers: {

    },
});

export default dishSlice.reducer;

