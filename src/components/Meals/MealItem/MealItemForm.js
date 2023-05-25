import { useRef, useState } from 'react';

import styles from './MealItemForm.module.css';
import Input from '../../UI/Input/Input';

export default function MealItemForm({addToCart, id}){
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredNumber = Number(enteredAmount);
    if(enteredAmount.trim().length === 0 
      || enteredNumber > 5 
      || enteredNumber < 0){
      setAmountIsValid(false);
      return;
    }

    addToCart(enteredNumber);
  }

  return(
    <form className={styles.form} onSubmit={submitHandler}>
      <Input 
        ref={amountInputRef}
        label='Amount'
        input={{
          id: `amount_${id}`,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }}
      />
      <button>Add</button>
      {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>
  );
}