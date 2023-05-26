import { useContext, useEffect, useState } from 'react';

import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cartContext';

export default function HeaderCartButton({onShowCart}){
  const [buttonIsAnimated, setButtonIsAnimated] = useState(false);

  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((accumulator, item) => {
    return accumulator + item.amount;
  }, 0);
  
  const btnClasses = `${styles.button} ${buttonIsAnimated ? styles.bump : ''}`;

  useEffect(() => {
    if(cartCtx.items.length === 0){
      return;
    }
    setButtonIsAnimated(true);
    const timerId = setTimeout(() => setButtonIsAnimated(false), 300);
    
    return () => {
      clearTimeout(timerId);
    };

  }, [cartCtx.items]);

  return(
    <button className={btnClasses} onClick={onShowCart}>
      <span className={styles.icon}>
        <CartIcon/>
      </span>
      <span>
        Your Cart
      </span>
      <span className={styles.badge}>
        {numberOfCartItems}
      </span>
    </button>
  );
}