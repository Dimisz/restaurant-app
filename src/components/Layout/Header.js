import React, { useContext } from 'react';

import styles from './Header.module.css';

import heroImage from '../../assets/food/food5.jpeg';
import HeaderCartButton from './HeaderCartButton';
import Button from '../UI/Button/Button';

import LoginContext from '../../store/loginContext';

export default function Header({onShowCart}){
  const ctx = useContext(LoginContext);
  return(
    <>
      <header className={styles.header}>
        <span className='logo'>
          <h1>Logo</h1>
        </span>
        {
          ctx.isLoggedIn && 
          <HeaderCartButton
          onShowCart={onShowCart}
        />
        }
        {
          ctx.isLoggedIn 
          ?
          <Button 
            // className={styles['login-button']}
            onClick={ctx.onLogout}
          >
            <span>Logout</span>
          </Button>
          :
          <Button 
            // className={styles['login-button']}
            onClick={ctx.onLogin}
          >
            <span>Login</span>
          </Button>
        }
      </header>
      <div className={styles['hero-image']}>
        <img src={heroImage} alt='food' />
      </div>
    </>
  );
}