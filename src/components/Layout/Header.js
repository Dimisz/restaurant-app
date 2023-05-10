import styles from './Header.module.css';

import heroImage from '../../assets/food/food5.jpeg';
import HeaderCartButton from './HeaderCartButton';
import Logo from '../UI/Logo';

export default function Header(){
  return(
    <>
      <header className={styles.header}>
        <span className='logo'>
          <h1>Logo</h1>
        </span>
        <HeaderCartButton/>
      </header>
      <div className={styles['hero-image']}>
        <img src={heroImage} alt='food' />
      </div>
    </>
  );
}