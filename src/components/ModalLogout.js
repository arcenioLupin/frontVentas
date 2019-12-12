import React from 'react';

const ModalLogout = props => (
  <div className={props.isOpen ? 'modal js-open' : 'modal'}>
    <div className='modal-dialog'>
      <div className='modal-content'>
        <div className='modal-body'>
          <button type='button' className='bootbox-close-button close' onClick={() => props.closeLogout()}>×</button>
          <div className='bootbox-body'>¿Desea salir del sistema?</div>
        </div>
        <div className='modal-footer'>
          <button data-bb-handler='cancel' type='button' className='btn btn-default' onClick={() => props.closeLogout()}>Cancelar</button>
          <button data-bb-handler='confirm' type='button' className='btn btn-primary' onClick={() => props.logout()}>Aceptar</button>
        </div>
      </div>
    </div>
  </div>
);

export default ModalLogout;
