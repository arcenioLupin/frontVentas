import React from 'react';

const Modal = props => (
  <div className={`modal in ${props.isOpen ? 'js-open' : ''}`} id={props.idModal} role='dialog'>
    <div className={`modal-dialog ${props.modalSize}`} role='document'>
      <button className='btn btn-sm btn-blue modal-close' onClick={() => props.closeModal(props.nameModal)}>Cerrar ventana</button>
      <div className='modal-content'>
        <div className='modal-body'>
          <h2 className='modal-title'>{props.title}</h2>
          {props.children}
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
