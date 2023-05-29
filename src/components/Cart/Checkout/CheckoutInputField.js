import { useReducer, useEffect } from "react";

const SET_VALUE = 'SET_VALUE';
const CHECK_VALUE_VALIDITY ='CHECK_VALUE_VALIDITY';
const SET_SHOW_ERROR = 'SET_SHOW_ERROR';
const SET_WAS_TOUCHED ='SET_WAS_TOUCHED';

const reducer = (state, action) => {
  switch(action.type){
    case SET_VALUE:
      return {
        ...state,
        enteredValue: action.payload
      };
    case CHECK_VALUE_VALIDITY:
      return {
        ...state,
        valueIsValid: action.payload //state.enteredValue.trim() !== ''
      };
    case SET_SHOW_ERROR:
      return {
        ...state,
        showError: action.payload//state.wasTouched && !state.valueIsValid
      };
    case SET_WAS_TOUCHED:
      return {
        ...state,
        wasTouched: action.payload
      };
    default:
      console.log('Reducer func fell through to the default case');
      break;
  }
}

const CheckoutInputField = ({ fieldType, fieldId, className, label, validationFunc, setFieldValid }) => {
  const [state, dispatch] = useReducer(reducer, {
    enteredValue: '',
    valueIsValid: false,
    showError: false,
    wasTouched: false
  });

  useEffect(() => {
    setFieldValid(state.valueIsValid);
  }, [state.valueIsValid]);
  
  // console.log(`showError: ${state.showError}`);
  // console.log(`wasTouched: ${state.wasTouched}`);
  // console.log(`enteredValue: ${state.enteredValue}`);
  // console.log(`valueIsValid: ${state.valueIsValid}`);


  const checkInputValidity = () => {
    dispatch({
      type: SET_SHOW_ERROR,
      payload: state.wasTouched && !state.valueIsValid
    });
  }

  const onChangeHandler = (e) => {
    dispatch({
      type: SET_VALUE,
      payload: e.target.value
    });
    dispatch({
      type: CHECK_VALUE_VALIDITY,
      payload: validationFunc(e.target.value)
    });
  }

  const onFocusHandler = () => {
    dispatch({
      type: SET_SHOW_ERROR,
      payload: false
    });
    dispatch({
      type: SET_WAS_TOUCHED,
      payload: true
    });
  }


  return(
    <div className={className}>
        <label htmlFor={fieldId}>{label}</label>
        <input 
          style={{backgroundColor: `${state.showError ? 'rgba(255, 0, 0, 0.1)' : ''}`}}
          type={fieldType} 
          id={fieldId} 
          name={fieldId} 
          value={state.enteredValue}
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
          onBlur={checkInputValidity}
        />
        {
          state.showError && <p style={{
            color: 'red',
            fontStyle: 'italic',
            fontSize: '0,5rem'
          }}>{label} field should not be empty</p>
        }
    </div>
  )
}

export default CheckoutInputField;