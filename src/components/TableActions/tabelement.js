import React, { Component } from 'react';

class TabElement extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick2(this.props.index, this.props.estado);
  }

  render() {
    return (
      <li
        className={
          `tabs-item ${this.props.isActive ? 'active' : null}`
        }
        onClick={this.handleClick}
      >
        <a className='tabs-item-link' >{this.props.name}</a>
      </li>
    );
  }
}

export default TabElement;
