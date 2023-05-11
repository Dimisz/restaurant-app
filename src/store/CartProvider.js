import { useReducer } from "react";

import CartContext from "./cartContext";

const ADD_ITEM = 'ADD_ITEM';
const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if(action.type === ADD_ITEM){
    return {  
      items: [...state.items, action.payload],
      totalAmount: state.totalAmount + (action.payload.price * action.payload.amount)
    }
  }
  return state;
}



export default function CartProvider(props){
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCart = (item) => {
    dispatchCartAction({
      type: ADD_ITEM,
      payload: item
    });
  };
  const removeItemFromCart = (id) => {};

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    openCart: () => {},
    closeCart: () => {}
  }
  return(
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}