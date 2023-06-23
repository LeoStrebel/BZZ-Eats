import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clear: (state) => {
      state.cart = []
    },
    addItem: (state, action) => {
      let savedItem = state.cart.find(item => item.item.id == action.payload.id)

      if (savedItem) {
        let index = state.cart.indexOf(savedItem)
        savedItem.amount = savedItem.amount + 1
        state.cart[index] = savedItem;
      } else {
        state.cart.push({ item: action.payload, amount: 1 })
      }
    },
    removeItemById: (state, action) => {
      console.log(action.payload)
      state.cart = state.cart.filter(item => item.item.id != action.payload.item.id)
    },
    incrementItem: (state, action) => {
      console.log(action.payload.id)
      let savedItem = state.cart.find(item => item.item.id == action.payload.item.id)

      let index = state.cart.indexOf(savedItem)
      savedItem.amount = savedItem.amount + 1
      state.cart[index] = savedItem;
    },
    decrementItem: (state, action) => {
      let savedItem = state.cart.find(item => item.item.id == action.payload.item.id)

      console.log(action.payload.item.id)
      if (savedItem.amount > 1) {
        let index = state.cart.indexOf(savedItem)
        savedItem.amount = savedItem.amount - 1
        state.cart[index] = savedItem;
      } else {
        console.log("delete")
        state.cart = state.cart.filter(item => item.item.id != action.payload.item.id)
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { clear, addItem, removeItemById, incrementItem, decrementItem } = cartSlice.actions

export default cartSlice.reducer