import { useState } from 'react';

import styles from './MealItemForm.module.css';

export default function MealItemForm({addToCart, id}){
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [enteredValue, setEneteredValue] = useState('');

  const checkInputValid = (value) => {
    const enteredNumber = Number(value);
    if(value.trim().length === 0 
      || enteredNumber > 5 
      || enteredNumber < 0){
      setAmountIsValid(false);
    }
    else {
      setAmountIsValid(true);
    }
  }

  const changeHandler = (e) => {
    // console.log('checking input');
    checkInputValid(e.target.value);
    setEneteredValue(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(amountIsValid){
      addToCart(Number(enteredValue));
      setEneteredValue('');
    }
  }

  return(
    <form className={styles.form} onSubmit={submitHandler}>
      <input 
        type='number'
        min='1'
        max='5'
        step='1'
        value={enteredValue}
        onChange={changeHandler}
      />
      <button disabled={!amountIsValid}>Add</button>
      {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>
  );
}