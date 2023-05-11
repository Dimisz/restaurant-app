import { useContext } from 'react';

import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cartContext';

export default function HeaderCartButton({onShowCart}){
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((accumulator, item) => {
    return accumulator + item.amount;
  }, 0);
  
  return(
    <button className={styles.button} onClick={onShowCart}>
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