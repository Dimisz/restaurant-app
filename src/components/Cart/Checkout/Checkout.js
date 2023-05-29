import { useEffect, useState } from 'react';
import styles from './Checkout.module.css';
import CheckoutInputField from './CheckoutInputField';

const Checkout = ({handleClose, cancelCheckout}) => {
  const [formValid, setFormValid] = useState(false);
  const [nameFieldValid, setNameFieldValid] = useState(false);
  const [streetFieldValid, setStreetFieldValid] = useState(false);
  const [codefieldValid, setCodeFieldValid] = useState(false);
  const [cityFieldValid, setCityFieldValid] = useState(false);

  useEffect(() => {
    // console.log('running setFormValid');
    setFormValid(nameFieldValid && streetFieldValid && codefieldValid && cityFieldValid);
  }, [nameFieldValid, streetFieldValid, codefieldValid, cityFieldValid]);

  const validate = (value) => {
    return value.trim() !== '';
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  }
  return(
    <form onSubmit={handleSubmit} className={styles.form}>
      <CheckoutInputField 
        className={styles.control} fieldId='name' 
        fieldType='text' label='Your name'
        validationFunc={validate}
        setFieldValid={setNameFieldValid}
      />
      <CheckoutInputField 
        className={styles.control} fieldId='street' 
        fieldType='text' label='Street'
        validationFunc={validate}
        setFieldValid={setStreetFieldValid}
      />
      <CheckoutInputField 
        className={styles.control} fieldId='postal-code' 
        fieldType='text' label='Postal Code'
        validationFunc={validate}
        setFieldValid={setCodeFieldValid}
      />
      <CheckoutInputField 
        className={styles.control} fieldId='city' 
        fieldType='text' label='City'
        validationFunc={validate}
        setFieldValid={setCityFieldValid}
      />

      <div className={styles.actions}>
        <button type='button' className={styles.left} onClick={cancelCheckout}>Cancel</button>
        <button type='button' onClick={handleClose}>Change Order</button>
        <button 
          type='submit' 
          className={`${styles.submit} ${!formValid ? styles.disabled : ''}`}
          disabled={!formValid}
        >Confirm</button>
      </div>
    </form>
  )
}

export default Checkout;