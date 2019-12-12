import React, { Component } from 'react'

class ComboCheck extends Component {
  constructor (props) {
    super(props)
    this.handleClickComboCheckFiltrar = this.handleClickComboCheckFiltrar.bind(
      this
    )
    this.handleInputChangeComboCheck = this.handleInputChangeComboCheck.bind(
      this
    )
  }

  handleClickComboCheckFiltrar () {
    this.props.onClickFiltrar()
  }
  handleInputChangeComboCheck (e, id, idComponente) {
    this.props.onClickCheck(e, id, idComponente)
  }

  render () {
    return (
      <div
        name='divComboCheck'
        className='dropdown dropdown-multi customToggle'
        id={this.props.idComponente}
      >
        <div className='dropdown-control' data-toggle='dropdown'>
          <input className='dropdown-control-input' />
          <label
            className={`dropdown-control-fakelabel ${
              this.props.total === undefined
                ? ''
                : this.props.total === 0
                  ? ''
                  : 'bold'
            }`}
          >
            <span>
              {this.props.name}
              {this.props.total === undefined
                ? null
                : this.props.total === 0
                  ? null
                  : ` (${this.props.total})`}
            </span>
            <span className='dropdown-control-count' />
          </label>
          <div className='dropdown-control-icon'>
            <i className='ion-arrow-down-b' />
          </div>
        </div>
        <div className='dropdown-tooltip dropdown-menu'>
          <div className='dropdown-scroll'>
            <p>{this.props.name}</p>
            <ul
              className={`${
                this.props.widthClass === undefined
                  ? ' '
                  : this.props.widthClass
              }`}
            >
              {this.props.lista.map(obj => (
                <li key={`${obj[this.props.id]}-${this.props.idComponente}`}>
                  <div className='checkbox'>
                    <label
                      htmlFor={`${obj[this.props.id]}-${
                        this.props.idComponente
                      }`}
                    >
                      <input
                        name='comboCheck'
                        className={this.props.idComponente}
                        type='checkbox'
                        id={`${obj[this.props.id]}-${this.props.idComponente}`}
                        onChange={e => {
                          this.handleInputChangeComboCheck(
                            e,
                            obj[this.props.id],
                            this.props.idComponente
                          )
                        }}
                      />
                      <div
                        className='checkbox-skin'
                        htmlFor={`${obj[this.props.id]}-${
                          this.props.idComponente
                        }`}
                      />
                      {obj[this.props.nombre]}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`dropdown-acions ${
              this.props.withButton ? '' : 'hidden'
            }`}
          >
            <button
              className='btn btn-dark checkDeGrillaCerrar'
              onClick={this.handleClickComboCheckFiltrar}
            >
              Filtrar
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ComboCheck
