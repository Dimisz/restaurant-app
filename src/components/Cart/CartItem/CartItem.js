import { useContext } from 'react';
import styles from './CartItem.module.css';
import CartContext from '../../../store/cartContext';

const CartItem = ({item}) => {
  const cartCtx = useContext(CartContext);
  const handleRemove = () => {
    cartCtx.removeItemFromCart({...item, amount: 1});
  }
  const handleAdd = () => {
    cartCtx.addItemToCart({...item, amount: 1});
  }

  return (
    <li className={styles['cart-item']}>
      <div>
        <h2>{item.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{`$${item.price.toFixed(2)}`}</span>
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

export default CartItem;
