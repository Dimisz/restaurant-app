import { useReducer } from "react";

import CartContext from "./cartContext";

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CLEAR_CART = 'CLEAR_CART';

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
  else if(action.type === CLEAR_CART){
    return {
      items: [],
      totalAmount: 0
    }
  }
  return state;
}



export default function CartProvider(props){
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);
  // console.log(cartState);

  const addItemToCart = (item) => {
    dispatch({
      type: ADD_ITEM,
      payload: item
    });
  };

  const removeItemFromCart = (item) => {
    dispatch({
      type: REMOVE_ITEM,
      payload: item
    });
  };

  const clearCart = () => {
    dispatch({
      type: CLEAR_CART
    })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    removeItemFromCart: removeItemFromCart,
    addItemToCart: addItemToCart,
    clearCart: clearCart,
    openCart: () => {},
    closeCart: () => {}
  }
  return(
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}