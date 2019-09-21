import {
    createSelector
} from 'reselect'

//input selector
const selectCart = state => state.cart;
//output selector => uses createSelector
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accum, cartItem) => accum + cartItem.quantity, 0)
)