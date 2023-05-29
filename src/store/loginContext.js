import React, { useState } from 'react';

const LoginContext = React.createContext();

export const LoginContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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

  const loginHandler = () => {
    setIsLoggedIn(true);
    setIsLoginFormDisplayed(false);
  };

  return(
    <LoginContext.Provider 
      value={{
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