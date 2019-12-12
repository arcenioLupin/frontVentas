import React from 'react';

const Steps = props => (
  <ol className='progresStep'>
    {
      props.stepsTitle.map((title, index) => (
        <li
          key={title}
          className={`progresStep-item ${props.step > (index + 1) ? 'prevActive' : null} ${props.step === (index + 1) ? 'active' : null}`}
        >
          <div className='progresStep-item-circle'>
            <span className='progresStep-index'>{index + 1}</span>
            <i className='progresStep-check ion-checkmark' />
          </div>
          <p>{title}</p>
        </li>
      ))
    }
  </ol>
);

export default Steps;
