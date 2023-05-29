import { useState, useContext } from 'react';

import styles from './Cart.module.css';
import Modal from '../UI/Modal/Modal';
import CartContext from '../../store/cartContext';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout/Checkout';

const Cart = ({onHide}) => {
  const cartCtx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const handleOrder = () => {
    setShowCheckout(true);
  }

  //checkout handlers
  const changeOrder = () => {
    setShowCheckout(false);
  }

  const cancelCheckout = () => {
    onHide();
    setShowCheckout(false);
  }
  // end of checkout handlers

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
      {
        showCheckout
        ?
        <Checkout 
          handleClose={changeOrder}
          cancelCheckout={cancelCheckout}
        />
        :
        <>
          <ul className={styles['cart-items']}>
          {renderedItems}
          </ul>
          <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={styles.actions}>
          <button 
            className={styles['button--alt']} 
            onClick={onHide}
          >
            Close
          </button>
          {hasItems &&
            (<button
              onClick={handleOrder}
              className={styles.button}
            >
              Order
            </button>)
          }
          </div>
        </>
      }
    </Modal>
  );
}

export default Cart;