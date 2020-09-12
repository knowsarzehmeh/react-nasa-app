import React from 'react';
import Backdrop from './Backdrop';

type NoResultProps = {

    showModal?: boolean;
    children: any;
    closeModal?: () => void;
  
  };
  
  const Modal: React.FC<NoResultProps> = ({showModal, closeModal, children}) => {
  
    return (
        <>
        <Backdrop show={showModal}  closeBackdrop={closeModal}/>
        <div className='Modal' 
        style={{
            transform:showModal ? 'translateY(0)' : 'translateY(-100vh)',
            opacity :showModal ? 1 : 0
        }}
    >
            {children}
        </div>
        </>
    );
};


export default Modal;