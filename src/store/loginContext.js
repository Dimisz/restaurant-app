import React, { useState } from 'react';

const LoginContext = React.createContext();

export const LoginContextProvider = (props) => {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginFormDisplayed, setIsLoginFormDisplayed] = useState(false);

  const showLoginFormHandler = () => {
    // console.log('show login func called')
    setIsLoginFormDisplayed(true);
  }

  const hideLoginFormHandler = () => {
    setIsLoginFormDisplayed(false);
  }

  const logoutHandler = () => {
    setIsLoggedIn(false);
  }

  const loginHandler = (email, pwd) => {
    // console.log(`email: ${email}`);
    // console.log(`pwd: ${pwd}`);
    setIsLoggedIn(true);
    setIsLoginFormDisplayed(false);
    setEmail(email);
  };

  return(
    <LoginContext.Provider 
      value={{
        email: email,
        isLoggedIn: isLoggedIn,
        isLoginFormDisplayed: isLoginFormDisplayed,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onDisplayLoginForm: showLoginFormHandler,
        onHideLoginForm: hideLoginFormHandler
      }}
    >
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginContext;