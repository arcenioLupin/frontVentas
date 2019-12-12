import React, { Component } from 'react';

export default class ComboBoxCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      listaCheckd: [],
    };

    this.handleClickMFilter = this.handleClickMFilter.bind(this);
    this.handleChangeArea = this.handleChangeArea.bind(this);
    this.handleOnClickFilter = this.handleOnClickFilter.bind(this);
    this.handleClickMFilterClose = this.handleClickMFilterClose.bind(this);
  }

  componentDidMount() {
    document.addEventListener('onClick', this.handleClickMFilterClose);
  }

  handleClickMFilterClose(e) {
    if (e.currentTarget.classList.contains(this.props.keyComboBox)) {
      this.setState({
        dropdownOpen: '',
      });
    } else {
      this.setState({
        dropdownOpen: '',
      });
    }
    this.handleOnClickFilter();
  }

  handleClickMFilter(val) {
    this.setState({
      dropdownOpen: val,
    });
  }


  handleChangeArea(id) {
    if (this.state.listaCheckd.indexOf(id)>=0) {
      this.state.listaCheckd.splice(this.state.listaCheckd.indexOf(id), 1);
      this.props.selectedBox(false, id);
    } else {
      this.setState({ listaCheckd: [...this.state.listaCheckd, id] });
      this.props.selectedBox(true, id);
    }
  }

  handleOnClickFilter() {
    this.setState({
      dropdownOpen: '',
    });
    if (this.props.btnFiltrar === 'true') {
      this.props.btnSearch(true);
    }
  }

  renderBotonFiltrar() {
    if (this.props.btnFiltrar === 'true') {
      return (
        <div className='dropdown-acions'>
          <button className='btn btn-dark' onClick={() => this.handleOnClickFilter()}>Filtrar</button>
        </div>
      );
    }


    return (<div />);
  }

  render() {
    return (
      <div className={` ${this.props.keyComboBox} dropdown dropdown-multi  ${this.state.dropdownOpen}`} onBlur={this.handleClickMFilterClose} id={this.props.keyComboBox}>
        <div className={`${this.props.keyComboBox}  dropdown-control `} data-toggle='dropdown' aria-expanded='true'>
          <input className={`${this.props.keyComboBox}  dropdown-control-input`} />
          <label className={`${this.props.keyComboBox} dropdown-control-fakelabel ${this.props.countSelect > 0 ? 'bold' : ''} `} >
            { this.props.countSelect > 0 ? (
              <span>{`${this.props.NameLabel} (${this.props.countSelect})`}</span>
              ) : (
                <span>{this.props.NameLabel}</span>
              )
            }
            <span className={`${this.props.keyComboBox} dropdown-control-count `} />
          </label>
          <div className={`${this.props.keyComboBox} dropdown-control-icon `}><i className={`${this.props.keyComboBox}  ion-arrow-down-b`} /></div>
        </div>
        <div className={`${this.props.keyComboBox} dropdown-tooltip dropdown-menu`}>
          <div className={`${this.props.keyComboBox} dropdown-scroll`} >
            <p className={this.props.keyComboBox} >{this.props.NameLabel}</p>
            <ul className={this.props.keyComboBox}>
              {
                this.props.listaComboBox.map(entity =>
                  <li className={this.props.keyComboBox} key={entity[this.props.MapValue]}>
                    <div className={`${this.props.keyComboBox} checkbox `} >
                      <label className={this.props.keyComboBox} >

                        <input
                          type='checkbox'
                          id={this.props.keyComboBox}
                          className={this.props.keyComboBox}
                          key={entity[this.props.MapValue]}
                          checked={this.state.listaCheckd.indexOf(entity[this.props.MapValue])>=0}
                        />

                        <div className={`${this.props.keyComboBox} checkbox-skin`} onClick={() => this.handleChangeArea(entity[this.props.MapValue])} />

                        {entity[this.props.MapLabel]}
                      </label>
                    </div>
                  </li>
                )
              }
            </ul>
          </div>
          {
          this.renderBotonFiltrar()
          }


        </div>
      </div>
    );
  }
}
