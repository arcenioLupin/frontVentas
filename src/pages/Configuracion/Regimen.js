import React, { Component } from 'react';
import { VENTAS_URL} from '../../constants'
import Alert from '../../components/Alert'

class Regimen extends Component {

    constructor (props) {
        super(props)
        this.state ={
            tipoRegimenLaboral : '',
            horaExtra :'',
            jornadaLaboralDiaria:'',
            alertRegistroSuccess: false,
            alertRegistroError: false
        }


        this.onChangeValue = this.onChangeValue.bind(this)
        this.guardarRegimen = this.guardarRegimen.bind(this)
        this.registrarEmpresa = this.registrarEmpresa.bind(this)
    }

    onChangeValue = e => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value })
      }

      showAlert = alertType => {
        this.setState({ [alertType]: true })
        setTimeout(() => this.setState({ [alertType]: false }), 5000)
      }
  

      registrarEmpresa = async(objRegimen)=>{
        const headers = {
          codUsuario: 'AKIM',
          token: 'abc123',
          'Content-Type': 'application/json'
        }     
        const body = objRegimen;
  
        fetch(`${VENTAS_URL}/regimenLaboral`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(body)
        })
          .then(response => response.json())
          .then(data => {
                console.log(data);
                this.showAlert('alertRegistroSuccess')
          })
          .catch(err => {
            this.setState({ error: true, mensaje: 'Error interno' })
            this.showAlert('alertRegistroError')
            setTimeout(() => {
              this.setState({ error: false, mensaje: '' })
            }, 3000)
          })
  
      }

    guardarRegimen = e => {
        console.log("Guardar régimen"); 

        let regimen = {}
        regimen.regLaboTipo = this.state.tipoRegimenLaboral;
        regimen.regLaboJld = this.state.jornadaLaboralDiaria;
        regimen.regLaboPhe = this.state.horaExtra;

        this.registrarEmpresa(regimen);
    }  


    render() {

        const {
            alertRegistroSuccess,
            alertRegistroError
          } = this.state
        return (
            <div>
                <div className="row">
                        <div className="col-sm-2">
                            <label>Tipo de régimen laboral:</label>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" name="tipoRegimenLaboral" className="form-control" value={this.state.tipoRegimenLaboral}
                                        onChange={this.onChangeValue} />
                        </div>
                 </div> 
                <div className="row">  
                    <div className="col-sm-2">
                        <label>Jornada laboral diaria:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="jornadaLaboralDiaria" className="form-control" value={this.state.jornadaLaboralDiaria}
                               onChange={this.onChangeValue} />
                    </div>
                </div> 
                <div className="row">  
                    <div className="col-sm-2">
                        <label>% Hora Extra:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="horaExtra" className="form-control" value={this.state.horaExtra}
                               onChange={this.onChangeValue} />
                    </div>
                </div> 
                <div className="row">
                  <div className="col-sm-1">
                     <button className="btn btn-primary btn-sm" style={{ margin: "15px 15px" }}
                      onClick={e =>
                        this.guardarRegimen()}>
                          Guardar
                    </button>
                  </div>
            </div>
            { alertRegistroSuccess && (
                  <Alert
                    type='alert-success'
                    icon='ion-checkmark-circled'
                    closeAlert={this.closeAlertRegistroSuccess}
                  >
                    <p>Se registró el régimen correctamente .</p>
                  </Alert>
                )}

              { alertRegistroError && (
                <Alert
                  type='alert-warning'
                  icon='ion-alert-circled'
                  closeAlert={this.closeAlertRegistroError}
                >
                  <p>Hubo un error al registrar el régimen.</p>
                </Alert>
              )}	
            </div>
        );
    }
}

export default Regimen;