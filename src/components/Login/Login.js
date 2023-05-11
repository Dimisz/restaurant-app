import React, { useContext, useEffect, useReducer } from 'react';

import LoginContext from '../../store/loginContext';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import styles from './Login.module.css';


const CHANGE_EMAIL_VALUE = 'change-email-value';
const CHECK_EMAIL_VALIDITY ='check-email-vality';
const CHANGE_PASSWORD_VALUE = 'change-password-value';
const CHECK_PASSWORD_VALIDITY ='check-password-vality';
const CHECK_FORM_VALIDITY ='check-form-vality';

const reducer = (state, action) => {
  switch(action.type){
    case CHANGE_EMAIL_VALUE:
      return {
        ...state,
        enteredEmail: action.payload
      };
    case CHECK_EMAIL_VALIDITY:
      return {
        ...state,
        emailIsValid: state.enteredEmail.includes('@')
      };
    case CHANGE_PASSWORD_VALUE:
      return {
        ...state,
        enteredPassword: action.payload
      };
    case CHECK_PASSWORD_VALIDITY:
      return {
        ...state,
        passwordIsValid: state.enteredPassword.trim().length > 6
      };
    case CHECK_FORM_VALIDITY:
      return {
        ...state,
        formIsValid: state.enteredPassword.trim().length > 6 && state.enteredEmail.includes('@')
      };
    default:
      console.log('Reducer func fell through to the default case');
      break;
  }
}

const Login = () => {
  const ctx = useContext(LoginContext);

  const [state, dispatch] = useReducer(reducer, {
    enteredEmail: '',
    emailIsValid: null,
    enteredPassword: '',
    passwordIsValid: null,
    formIsValid: null
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch({
        type: CHECK_FORM_VALIDITY
      });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [state.enteredEmail, state.enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatch({
      type: CHANGE_EMAIL_VALUE,
      payload: event.target.value
    });
  };

  const passwordChangeHandler = (event) => {
    dispatch({
      type: CHANGE_PASSWORD_VALUE,
      payload: event.target.value
    });
  };

  const validateEmailHandler = () => {
    dispatch({
      type: CHECK_EMAIL_VALIDITY
    });
  };

  const validatePasswordHandler = () => {
    dispatch({
      type: CHECK_PASSWORD_VALIDITY
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(state.enteredEmail, state.enteredPassword);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            state.emailIsValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={state.enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            state.passwordIsValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!styles.formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;