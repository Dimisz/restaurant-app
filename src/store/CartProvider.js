import { useReducer } from "react";

import CartContext from "./cartContext";

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if(action.type === ADD_ITEM){
    const [ existingItem ] = state.items.filter(({id}) => id === action.payload.id);
    if(existingItem){
      const remainingItems = state.items.filter(({id}) => id !== action.payload.id);
      const newItem = {...existingItem, amount: existingItem.amount + 1};

      return {
        items: [...remainingItems, newItem],
        totalAmount: state.totalAmount + (action.payload.price)
      }
    }
    else {
      return {
        items: [...state.items, action.payload],
        totalAmount: state.totalAmount + (action.payload.price)
      }
    }
  }

  else if(action.type === REMOVE_ITEM){
    const [ existingItem ] = state.items.filter(({id}) => id === action.payload.id);
    if(existingItem){
      const remainingItems = state.items.filter(({id}) => id !== action.payload.id);
      if(existingItem.amount === 1){
        return {
          items: [...remainingItems],
          totalAmount: state.totalAmount - (action.payload.price)
        }
      }
      else {
        const newItem = {...existingItem, amount: existingItem.amount - 1};
        return {
          items: [...remainingItems, newItem],
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
    addItemToCart: addItemToCart,
    removeItemFromCart: removeItemFromCart,
    openCart: () => {},
    closeCart: () => {}
  }
  return(
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}