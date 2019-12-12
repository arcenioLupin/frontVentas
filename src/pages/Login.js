import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { LOGIN_URL } from '../constants'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: false,
      mensaje: ''
    }

    this.onChangeInput = this.onChangeInput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChangeInput (e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()
    const headers = {
      codUsuario: 'AKIM',
      token: 'abc123',
      'Content-Type': 'application/json'
    }

    const body = {
      usuarioPassword: this.state.password,
      usuarioUser: this.state.username
    }

    fetch(`${LOGIN_URL}/usuarios/autenticar`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        const { usuario, message } = data
        if (usuario) {
          localStorage.setItem('user', JSON.stringify(data))
          this.props.history.push({ pathname: '/principal' })
          window.location.reload()
        } else {
          this.setState({ error: true, message })
          setTimeout(() => {
            this.setState({ error: false, mensaje: '' })
          }, 3000)
        }
      })
      .catch(err => {
        this.setState({ error: true, mensaje: 'Error interno' })
        setTimeout(() => {
          this.setState({ error: false, mensaje: '' })
        }, 3000)
      })
  }

  render () {
    return (
      <div className='login-container'>
        <form id='login' onSubmit={this.onSubmit}>
          <label htmlFor='username'>Usuario</label>
          <input type='text' id='username' onChange={this.onChangeInput} />
          <label htmlFor='password'>Contraseña</label>
          <input type='password' id='password' onChange={this.onChangeInput} />
          <button>Ingresar</button>
          {this.state.error ? <p>{this.state.mensaje}</p> : null}
        </form>
        <div id='alertFichaEntrega' />
      </div>
    )
  }
}

export default withRouter(Login)
