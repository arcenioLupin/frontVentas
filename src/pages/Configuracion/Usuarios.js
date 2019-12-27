import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { VENTAS_URL} from '../../constants'
import Alert from '../../components/Alert'

class Usuarios extends Component {

    constructor (props) {
        super(props)
        this.state ={
            usuarioFechaInicio: null,
            usuarioFechaFin: null,
            usuarioUser:'',
            usuarioApePaterno:'',
            nombres:'',
            usuarioApeMaterno:'',
            contraseniaRepetida:'',
            contrasenia:'',
            usuarioActivo:'',
            correo:'',
            usuarioTelefono:'',
            usuarioMovil:'',
            usuarioNumAdmin:'',
            usuarioTelefono2:'',
            usuarioPerfil:'',
            alertRegistroSuccess: false,
            alertRegistroError: false

        }

        this.onChangeValue = this.onChangeValue.bind(this)
        this.guardarUsuario = this.guardarUsuario.bind(this)
    }

    onChangeValue = e => {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value })
      }

      showAlert = alertType => {
        this.setState({ [alertType]: true })
        setTimeout(() => this.setState({ [alertType]: false }), 5000)
      }      

    grabarUsuario = async(objUsuario)=>{
        const headers = {
          codUsuario: 'AKIM',
          token: 'abc123',
          'Content-Type': 'application/json'
        }     
        const body = objUsuario;
  
        fetch(`${VENTAS_URL}/usuarios`, {
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

    guardarUsuario = () =>{
     console.log("Guardar usuario");
     let usuario = {}

     usuario.usuarioUser = this.state.usuarioUser
     usuario.usuarioNombres = this.state.nombres
     usuario.usuarioApePaterno = this.state.usuarioApePaterno
     usuario.usuarioApeMaterno = this.state.usuarioApeMaterno
     usuario.usuarioPassword = this.state.contrasenia
     usuario.usuarioActivo = this.state.usuarioActivo
     usuario.usuarioEmail = this.state.correo
     usuario.usuarioFechaInicio = this.state.usuarioFechaInicio
     usuario.usuarioFechaFin = this.state.usuarioFechaFin
     usuario.usuarioTelefono = this.state.usuarioTelefono
     usuario.usuarioMovil = this.state.usuarioMovil
     usuario.usuarioTelefono2 = this.state.usuarioTelefono2
     usuario.usuarioNumAdmin = this.state.usuarioNumAdmin
     usuario.usuarioPerfil = this.state.usuarioPerfil

     this.grabarUsuario(usuario);
        
    }

    handleChangeFechaDesde = date => this.setState({ usuarioFechaInicio: date });	
    handleChangeFechaHasta = date => this.setState({ usuarioFechaFin: date });	

    componentDidMount(){

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
                        <label>Inicio de sesión:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="usuarioUser" className="form-control" value={this.state.usuarioUser}
                                    onChange={this.onChangeValue} />
                    </div>
                    <div className="col-sm-2">
                        <label>Apellido Paterno:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="usuarioApePaterno" className="form-control" value={this.state.usuarioApePaterno}
                               onChange={this.onChangeValue} />
                    </div>
                </div> 
                <div className="row">
                    <div className="col-sm-2">
                        <label>Apellido Materno:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="usuarioApeMaterno" className="form-control" value={this.state.usuarioApeMaterno}
                               onChange={this.onChangeValue} />
                    </div>
                    <div className="col-sm-2">
                        <label>Nombres:</label>
                    </div>
                    <div className="col-sm-4">
                    <input type="text" name="nombres" className="form-control" value={this.state.nombres}
                               onChange={this.onChangeValue} />
                    </div>                    
                </div> 
                <div className="row">
                    <div className="col-sm-2">
                        <label>Contraseña:</label>
                    </div>
                    <div className="col-sm-4">
                    <input type="password" name="contrasenia" autoComplete="off" className="form-control" value={this.state.contrasenia}
                               onChange={this.onChangeValue} />
                    </div>
                    <div className="col-sm-2">
                        <label>Confirma Contraseña:</label>
                    </div>
                    <div className="col-sm-4">
                         <input type="password" name="contraseniaRepetida" autoComplete="new-password" className="form-control" value={this.state.contraseniaRepetida}
                               onChange={this.onChangeValue} />
                    </div>                    
                </div>  
  
                <div className="row">
                    <div className="col-sm-2">
                        <label>Activo:</label>
                    </div>
                    <div className="col-sm-4">
                            <div className="select">
                                    <select className='form-control' 
                                            id="usuarioActivo" 
                                            name='usuarioActivo'
                                            value={this.state.usuarioActivo}
                                            onChange={this.onChangeValue} 
                                         >
                                            <option value="">SELECCIONE</option>
                                            <option value="1">SI</option>
                                            <option value="2">NO</option>
                                    </select>
                                    <div className='select-control-icon'><i className='ion-arrow-down-b' /></div>
                            </div>
                    </div>
                    <div className="col-sm-2">
                        <label>Correo electrónico:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="correo" className="form-control" value={this.state.correo}
                                    onChange={this.onChangeValue} />
                    </div>                    
                </div>   
                                                            
                <div className="row">
                    <div className="col-sm-2">
                       <label className="control-label">Válido desde:</label>
                    </div>
                    <div className="col-sm-4">
                    <div className="form-group">
                        <div className="col-md-10" style={{ paddingLeft: '0px' }}>
                        <DatePicker
                            selected={this.state.usuarioFechaInicio}
                            className="form-control fSearch-search date-picker ng-pristine ng-valid ng-isolate-scope ng-touched"
                            dateFormat="DD/MM/YYYY"
                            locale="es"
                            onChange={this.handleChangeFechaDesde}
                            id="usuarioFechaInicio"
                            name="usuarioFechaInicio"
                        />

                        </div>
                    </div>
                    </div>	
                    <div className="col-sm-2">
                       <label className="control-label">Válido hasta:</label>
                    </div>
                    <div className="col-sm-4">
                    <div className="form-group">
                        <div className="col-md-10" style={{ paddingLeft: '0px' }}>
                        <DatePicker
                            selected={this.state.usuarioFechaFin}
                            className="form-control fSearch-search date-picker ng-pristine ng-valid ng-isolate-scope ng-touched"
                            dateFormat="DD/MM/YYYY"
                            locale="es"
                            onChange={this.handleChangeFechaHasta}
                            id="usuarioFechaFin"
                            name="usuarioFechaFin"
                        />

                        </div>
                    </div>
                    </div>                   
                </div> 
                <div className="row">
                    <div className="col-sm-2">
                        <label>Teléfono:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="usuarioTelefono" className="form-control" value={this.state.usuarioTelefono}
                                    onChange={this.onChangeValue} />
                    </div>
                    <div className="col-sm-2">
                        <label>Teléfono Móvil:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="usuarioMovil" className="form-control" value={this.state.usuarioMovil}
                               onChange={this.onChangeValue} />
                    </div>
                </div>  

                <div className="row">
                    <div className="col-sm-2">
                        <label>Teléfono 2:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="usuarioTelefono2" className="form-control" value={this.state.usuarioTelefono2}
                                    onChange={this.onChangeValue} />
                    </div>
                    <div className="col-sm-2">
                        <label>Número Administrativo:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="usuarioNumAdmin" className="form-control" value={this.state.usuarioNumAdmin}
                               onChange={this.onChangeValue} />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-sm-2">
                        <label>Perfil:</label>
                    </div>
                    <div className="col-sm-4">
                          <div className="select">
                                    <select className='form-control' 
                                            id="usuarioPerfil" 
                                            name='usuarioPerfil'
                                            value={this.state.usuarioPerfil}
                                            onChange={this.onChangeValue} 
                                         >
                                            <option value="">SELECCIONE</option>
                                            <option value="1">PERFIL 1</option>
                                            <option value="2">PERFIL 2</option>
                                            <option value="2">PERFIL 3</option>
                                            <option value="2">PERFIL 4</option>
                                            <option value="2">PERFIL 5</option>
                                    </select>
                                    <div className='select-control-icon'><i className='ion-arrow-down-b' /></div>
                            </div>
                    </div>

                </div>  
                <div className="row">
                            <center>
                                <button className="btn btn-primary btn-sm" style={{ margin: "15px 15px" }}
                                   onClick={this.guardarUsuario} >
                                    GUARDAR
                               </button>
                               <button className="btn btn-primary btn-sm" style={{ margin: "15px 15px" }}
                                    >
                                    LIMPIAR
                               </button>
                            </center>
                </div>   
                    { alertRegistroSuccess && (
                    <Alert
                        type='alert-success'
                        icon='ion-checkmark-circled'
                        closeAlert={this.closeAlertRegistroSuccess}
                    >
                        <p>Se registró el usuario correctamente .</p>
                    </Alert>
                    )}

                { alertRegistroError && (
                    <Alert
                    type='alert-warning'
                    icon='ion-alert-circled'
                    closeAlert={this.closeAlertRegistroError}
                    >
                    <p>Hubo un error al registrar el usuario.</p>
                    </Alert>
                )}                           

            </div>
        );
    }
}

export default Usuarios;