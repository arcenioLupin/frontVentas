import React from 'react';

const ComboCheck = props => (
  <div name='divComboCheck' className='dropdown dropdown-multi customToggle' id={props.name.split(' ').join('-')}>
    <div className='dropdown-control'>
      <input className='dropdown-control-input' />
      {
        props.selectedItems === 0 ?
          <label htmlFor={props.name} className='dropdown-control-fakelabel'>{props.name}</label> :
          <label htmlFor={props.name} className='dropdown-control-fakelabel bold'>{props.name} ({props.selectedItems})</label>
      }
      <div className='dropdown-control-icon'><i className='ion-arrow-down-b' /></div>
    </div>
    <div className='dropdown-tooltip dropdown-menu'>
      <div className='dropdown-scroll'>
        <p>{props.name}</p>
        <ul>
          {
            props.items.map(item =>
              <li key={item[props.itemID]} >
                <div className='checkbox'>
                  <label htmlFor={`${item[props.itemID]}-${item[props.itemName]}`} >
                    <input name='comboCheck' type='checkbox' id={`${item[props.itemID]}-${item[props.itemName]}`} value={item[props.itemID]} onChange={e => props.onChangeGroup(e, props.nameState)} />
                    <div className='checkbox-skin' />
                    {item[props.itemName]}
                  </label>
                </div>
              </li>
            )}
        </ul>
      </div>
      <div className='dropdown-acions'>
        <button className='btn btn-dark checkDeGrillaCerrar' onClick={props.filter}>Filtrar</button>
      </div>
    </div>
  </div>
);

export default ComboCheck;
