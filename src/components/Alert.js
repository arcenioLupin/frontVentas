import React from 'react';

const Alert = props => (
  <div className={`alert ${props.type}`} style={{ zIndex: 2000 }} role='alert' >
    <i className={props.icon} />
    {props.children}
    {
      props.closeAlert ?
        <i className='ion-close' onClick={() => props.closeAlert()} /> :
        null
    }
  </div >
);

export default Alert;
