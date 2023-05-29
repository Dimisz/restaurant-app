import { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from 'restaurant-menu';

import './App.css';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Login from './components/Login/Login';
import Cart from './components/Cart/Cart';

import CartProvider from './store/CartProvider';
import { LoginContextProvider } from './store/loginContext';

export default function App(){
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const storedLoggedInValue = localStorage.getItem('isLoggedIn');
    if(storedLoggedInValue === '1'){
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    console.log(Menu);
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };


  const showCartHandler = () => {
    setIsCartVisible(true);
  }

  const hideCartHandler = () => {
    setIsCartVisible(false);
  }

  return(
    <LoginContextProvider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
      }}
    >
      <CartProvider>
        {isCartVisible && <Cart onHide={hideCartHandler}/>}
        <Header
          onShowCart={showCartHandler}
        />
        <main>
          <Meals/>
        </main>
      </CartProvider>
    </LoginContextProvider>
  );
}