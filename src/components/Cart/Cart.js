import { useContext } from 'react';

import styles from './Cart.module.css';
import Modal from '../UI/Modal/Modal';
import CartContext from '../../store/cartContext';

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
export default function Cart({onHide}){
  const cartCtx = useContext(CartContext);

  const totalAmount = `cartCtx.totalAmount.toFixed(2)`;
  const renderedItems = cartCtx.items.map((item) => {
    return(
      <li key={item.id}>{item.name}</li>
    );
  });

  return(
    <Modal onHide={onHide}>
      <ul className={styles['cart-items']}>
        {renderedItems}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={onHide}>
          Close
        </button>
        <button className={styles.button}>
          Order
        </button>
      </div>
    </Modal>
  );
}