import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { withRouter } from 'react-router-dom';
import './cart-dropdown.styles.scss';

const CartDropDown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>
    <CustomButton onClick={() => {
      history.push('/checkout');
      dispatch(toggleCartHidden())
      }}>
      GO TO CHECKOUT
    </CustomButton>
  </div>
);
/*const mapStateToProps = ({cart: { cartItems } }) => ({
    cartItems
})*/

const mapStateToProps = state => ({
  cartItems: selectCartItems(state)
});

/*
we recieve dispatch by default from connect whenever dispatch is not sent as a param
 */

export default withRouter(connect(mapStateToProps)(CartDropDown));
