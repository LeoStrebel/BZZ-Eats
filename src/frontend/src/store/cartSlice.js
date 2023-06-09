import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: ["Item1", "Item2"],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clear: (state) => {
      state.cart = []
    },
    addItem: (state, action) => {
      state.cart.push(action.payload)
    },
    removeItemById: (state, action) => {
      state.cart.filter(item => item.id !== action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { clear, addItem, removeItemById } = cartSlice.actions

export default cartSlice.reducer