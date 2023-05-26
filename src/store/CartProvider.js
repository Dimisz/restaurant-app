import { useReducer } from "react";

import CartContext from "./cartContext";

const ADD_ONE_ITEM = 'ADD_ONE_ITEM';
const REMOVE_ONE_ITEM = 'REMOVE_ONE_ITEM';
const ADD_ONE_OR_MORE_ITEMS = 'ADD_ONE_OR_MORE_ITEMS';

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if(action.type === ADD_ONE_OR_MORE_ITEMS){
    const [ existingItem ] = state.items.filter(({id}) => id === action.payload.id);
    if(action.payload.amount > 0){ 
      if(existingItem){
        const remainingItems = state.items.filter(({id}) => id !== action.payload.id);
        const newItem = {...existingItem, amount: existingItem.amount + 1};

        return {
          items: [...remainingItems, newItem],
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
  }
  else if(action.type === ADD_ONE_ITEM){
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

  else if(action.type === REMOVE_ONE_ITEM){
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

  const addOneOrMoreItemsToCart = (item) => {
    dispatchCartAction({
      type: ADD_ONE_OR_MORE_ITEMS,
      payload: item
    });
  };

  const addOneItemToCart = (item) => {
    dispatchCartAction({
      type: ADD_ONE_ITEM,
      payload: item
    });
  };

  const removeOneItemFromCart = (item) => {
    dispatchCartAction({
      type: REMOVE_ONE_ITEM,
      payload: item
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addOneOrMoreItemsToCart: addOneOrMoreItemsToCart,
    removeOneItemFromCart: removeOneItemFromCart,
    addOneItemToCart: addOneItemToCart,
    openCart: () => {},
    closeCart: () => {}
  }
  return(
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}