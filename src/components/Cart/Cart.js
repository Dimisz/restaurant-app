import styles from './Cart.module.css';

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
export default function Cart(){
  const renderedItems = DUMMY_MEALS.map((item) => {
    return(
      <li key={item.id}>{item.name}</li>
    );
  })
  return(
    <div>
      <ul className={styles['cart-items']}>
        {renderedItems}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']}>
          Close
        </button>
        <button className={styles.button}>
          Order
        </button>
      </div>
    </div>
  );
}