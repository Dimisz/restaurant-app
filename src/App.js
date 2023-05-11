import { useState } from 'react';

import './App.css';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

import Cart from './components/Cart/Cart';

import CartProvider from './store/CartProvider';

export default function App(){
  const [isCartVisible, setIsCartVisible] = useState(false);

  const showCartHandler = () => {
    setIsCartVisible(true);
  }

  const hideCartHandler = () => {
    setIsCartVisible(false);
  }

  return(
    <CartProvider>
      {isCartVisible && <Cart onHideCart={hideCartHandler}/>}
      <Header
        onShowCart={showCartHandler}
      />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}