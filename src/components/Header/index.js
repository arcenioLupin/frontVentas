import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Nav from './nav.js';
import ModalLogout from '../ModalLogout';
import { OPTIONS_LIST } from '../../constants';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logout: false,
    };
  }

  openLogout = () => this.setState({ logout: true })
  closeLogout = () => this.setState({ logout: false })

  goTo = (url) => {
    this.props.history.push(url);
    window.location.reload();
  }

  logout = () => {
    localStorage.removeItem('userAccessToken');
    localStorage.removeItem('user');
    this.goTo('/login/');
  }

  render() {
    return (
      <div>
        <Nav items={OPTIONS_LIST} openLogout={this.openLogout} />
        <ModalLogout isOpen={this.state.logout} closeLogout={this.closeLogout} logout={this.logout} />
      </div>
    );
  }
}

export default withRouter(Header);
