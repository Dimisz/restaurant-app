import { useEffect, useState, useContext } from 'react';
import styles from './Checkout.module.css';
import CheckoutInputField from './CheckoutInputField';

import LoginContext from '../../../store/loginContext';
import CartContext from '../../../store/cartContext';

const Checkout = ({handleClose, cancelCheckout}) => {
  const loginCtx = useContext(LoginContext);
  const cartCtx = useContext(CartContext);

  const [formValid, setFormValid] = useState(false);
  const [nameFieldValid, setNameFieldValid] = useState(false);
  const [nameField, setNameField] = useState('');

  const [streetFieldValid, setStreetFieldValid] = useState(false);
  const [streetField, setStreetField] = useState('');

  const [codeFieldValid, setCodeFieldValid] = useState(false);
  const [codeField, setCodeField] = useState('');

  const [cityFieldValid, setCityFieldValid] = useState(false);
  const [cityField, setCityField] = useState('');

  useEffect(() => {
    // console.log('running setFormValid');
    setFormValid(nameFieldValid && streetFieldValid && codeFieldValid && cityFieldValid);
  }, [nameFieldValid, streetFieldValid, codeFieldValid, cityFieldValid]);

  const validate = (value) => {
    return value.trim() !== '';
  }

  const placeOrder = (order) => {
    fetch('https://react-restaurant-app-d1d55-default-rtdb.firebaseio.com/oreders.json', {
      method: 'POST',
      body: JSON.stringify(order)
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      user: loginCtx.email,
      orderItems: cartCtx.items,
      address: {
        name: nameField,
        street: streetField,
        postalCode: codeField,
        city: cityField
      }
    }
    placeOrder(order);

  }
  return(
    <form onSubmit={handleSubmit} className={styles.form}>
      <CheckoutInputField 
        className={styles.control} fieldId='name' 
        fieldType='text' label='Your name'
        validationFunc={validate}
        setFieldValid={setNameFieldValid}
        setFieldValue={setNameField}
      />
      <CheckoutInputField 
        className={styles.control} fieldId='street' 
        fieldType='text' label='Street'
        validationFunc={validate}
        setFieldValid={setStreetFieldValid}
        setFieldValue={setStreetField}
      />
      <CheckoutInputField 
        className={styles.control} fieldId='postal-code' 
        fieldType='text' label='Postal Code'
        validationFunc={validate}
        setFieldValid={setCodeFieldValid}
        setFieldValue={setCodeField}
      />
      <CheckoutInputField 
        className={styles.control} fieldId='city' 
        fieldType='text' label='City'
        validationFunc={validate}
        setFieldValid={setCityFieldValid}
        setFieldValue={setCityField}
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