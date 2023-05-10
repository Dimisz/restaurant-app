import styles from './Input.module.css';

export default function Input({input, label}){
  return(
    <div className={styles.input}>
      <label htmlFor={input.id}>{label}</label>
      <input
        {...input}
      />
    </div>
  )
}