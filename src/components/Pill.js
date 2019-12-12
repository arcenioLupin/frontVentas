import React from 'react';

export const ColorPill = (props) => {
  let pillClass;

  switch (props.estado) {
    case 'P':
      pillClass = 'pill pill-block pill-yellow';
      break;
    case 'A':
      pillClass = 'pill pill-block pill-green';
      break;
    case 'R':
      pillClass = 'pill pill-block pill-red';
      break;
    default:
      pillClass = 'pill pill-block';
  }

  return (
    <span className={pillClass}>{props.descripcion}</span>
  );
};

export const TabItemPill = (props) => {
  const activePill = props.index === props.active ? 'active' : '';
  const iconPill = `tabs-itemPill-icon ${props.iconPill}`;

  return (
    <li className={`tabs-itemPill ${activePill}`} onClick={() => props.changeIndex(props.index)}>
      <a className='tabs-itemPill-link'>
        <i className={iconPill} onClick={() => props.changeIndex(props.index)} />
        <span className='tabs-itemPill-label'>{props.name}</span>
      </a>
    </li>
  );
};
