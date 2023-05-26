import { useContext } from 'react';

import styles from './Cart.module.css';
import Modal from '../UI/Modal/Modal';
import CartContext from '../../store/cartContext';
import CartItem from './CartItem/CartItem';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
    qty: 1
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
    qty: 2
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
    qty: 3
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
    qty: 1
  },
];

const Cart = ({onHide}) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;


  const renderedItems = cartCtx.items.map((item) => {
    return(
      <CartItem 
        key={item.id} 
        item={item}
      />
    );
  });

  return(
    <Modal onHide={onHide}>
      <ul className={styles['cart-items']}>
        {renderedItems}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={onHide}>
          Close
        </button>
        {hasItems && 
          (<button className={styles.button}>
            Order
          </button>)
        }
      </div>
    </Modal>
  );
}

export default Cart;