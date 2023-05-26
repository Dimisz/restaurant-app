import { useReducer } from "react";

import CartContext from "./cartContext";

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if(action.type === ADD_ITEM && action.payload.amount > 0){
    const [ existingItem ] = state.items.filter(({id}) => id === action.payload.id);
    if(existingItem){
      const newItems = state.items.map((item) => {
        if(item.id === existingItem.id){
          return {...item, amount: existingItem.amount + action.payload.amount}
        }
        return item;
      });

      return {
        items: [...newItems],
        totalAmount: state.totalAmount + (action.payload.price * action.payload.amount)
      }
    }
    else {
      return {
        items: [...state.items, action.payload],
        totalAmount: state.totalAmount + (action.payload.price * action.payload.amount)
      }
    }
  }

  else if(action.type === REMOVE_ITEM){
    const [ existingItem ] = state.items.filter(({id}) => id === action.payload.id);
    if(existingItem){
      if(existingItem.amount === 1){
        const remainingItems = state.items.filter(({id}) => id !== action.payload.id);
        return {
          items: [...remainingItems],
          totalAmount: state.totalAmount - (action.payload.price)
        }
      }
      else if(existingItem.amount > 1) {
        const newItems = state.items.map((item) => {
          if(item.id === existingItem.id){
            return {...item, amount: existingItem.amount - 1}
          }
          return item;
        });
        return {
          items: [...newItems],
          totalAmount: state.totalAmount - (action.payload.price)
        }
      }
    }
    else {
      return state;
    }
  }
  return state;
}



export default function CartProvider(props){
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
  // console.log(cartState);

  const addItemToCart = (item) => {
    dispatchCartAction({
      type: ADD_ITEM,
      payload: item
    });
  };

  const removeItemFromCart = (item) => {
    dispatchCartAction({
      type: REMOVE_ITEM,
      payload: item
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    removeItemFromCart: removeItemFromCart,
    addItemToCart: addItemToCart,
    openCart: () => {},
    closeCart: () => {}
  }
  return(
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}