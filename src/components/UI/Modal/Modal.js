import styles from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = ({onClose}) => {
  return(
    <div className={styles.backdrop} onClick={onClose}></div>
  );
}

const ModalOverlay = ({children}) => {
  return(
    <div className={styles.modal}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

const portalElement = document.getElementById('overlays');

export default function Modal({onHide, children}){
  return(
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onHide}/>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>
          {children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  )
}