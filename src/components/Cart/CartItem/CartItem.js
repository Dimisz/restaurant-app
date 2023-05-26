import { useContext, memo } from 'react';
import styles from './CartItem.module.css';
import CartContext from '../../../store/cartContext';

const CartItem = ({item}) => {
  const cartCtx = useContext(CartContext);
  const handleRemove = () => {
    cartCtx.removeOneItemFromCart(item);
  }
  const handleAdd = () => {
    cartCtx.addOneItemToCart(item);
  }

  const price = `$${item.price.toFixed(2)}`;

  return (
    <li className={styles['cart-item']}>
      <div>
        <h2>{item.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{item.price}</span>
          <span className={styles.amount}>x {item.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={handleRemove}>−</button>
        <button onClick={handleAdd}>+</button>
      </div>
    </li>
  );
};

export default memo(CartItem);
