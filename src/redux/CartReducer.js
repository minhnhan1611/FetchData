import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const index = state.items.findIndex((productCart) => productCart.id === action.payload.id);

            if (index !== -1) {
                state.items[index].quantity += 1;
            } else {
                state.items.push(action.payload)
            }
        },
        removeCart: (state, action) => {
            const cartUpdate = state.items.filter(productCart => productCart.id !== action.payload);
            state.items = cartUpdate
        },
        decrementQuantity: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload);
            if (state.items[index].quantity > 1) {
                state.items[index].quantity -= 1;
            } else {
                alert('Số lượng sản phẩm tối thiểu là 1!');
            }
        },
        incrementQuantity: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload);
            state.items[index].quantity += 1;
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            state.items[index].quantity = quantity;
        }
    }
})

const { actions, reducer: CartReducer } = CartSlice;
export const { addToCart, removeCart, decrementQuantity, incrementQuantity, updateQuantity } = actions;
export default CartReducer;