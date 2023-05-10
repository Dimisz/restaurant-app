import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';

export default function MealItem({meal}){
  return(
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>${meal.price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm/>
      </div>
    </li>
  );
}