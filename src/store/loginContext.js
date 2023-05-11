import React, { useState } from 'react';

const LoginContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const LoginContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    setIsLoggedIn(false);
  }

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  return(
    <LoginContext.Provider 
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
      }}
    >
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginContext;