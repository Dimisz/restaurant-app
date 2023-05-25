import { useContext} from 'react';

import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cartContext';
import LoginContext from '../../../store/loginContext';

export default function MealItem({meal}){
  const cartCtx = useContext(CartContext);
  const loginCtx = useContext(LoginContext);


  const addToCart = (amount) => {
    cartCtx.addItemToCart({
      id: meal.id,
      name: meal.name,
      amount: amount,
      price: meal.price
    });
  }

  return(
    <li className={styles.meal} 
        style={!loginCtx.isLoggedIn ?
          {
            justifyContent: 'space-around',
            textAlign: 'center'
          } 
          : {}
        }
    >
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>${meal.price.toFixed(2)}</div>
      </div>
      {
        loginCtx.isLoggedIn &&
          <div>
            <MealItemForm addToCart={addToCart} id={meal.id}/>
          </div>
      }
      
    </li>
  );
}