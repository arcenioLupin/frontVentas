import React, { Component } from 'react';
import { VENTAS_URL} from '../../constants'
import TablaPerfil from '../Configuracion/TablaPerfil'
import PerfilModal from '../Configuracion/PerfilModal'
import Alert from '../../components/Alert'

class Perfil extends Component {
    constructor (props) {
        super(props)
        this.state ={
            listaPerfiles:[],
            modalEditarPerfil:false,
            indiceEditar: 0,
            perfilDescripcion:'',
            perfilActivo:'1',
            perfilId : null,
            alertRegistroSuccess: false,
            alertRegistroError: false,
            alertEliminarSuccess: false,
            alertEliminarError: false

        }
       this.editarPerfil = this.editarPerfil.bind(this)
       this.eliminarPerfil = this.eliminarPerfil.bind(this)
       this.cerrarModalEditarPerfil = this.cerrarModalEditarPerfil.bind(this)
       this.onChangeValue = this.onChangeValue.bind(this)
       this.guardarPerfil = this.guardarPerfil.bind(this)
       this.abrirModalEditarPerfil = this.abrirModalEditarPerfil.bind(this)

     } 

     componentDidMount(){
         this.consultarPerfiles();
     }

     showAlert = alertType => {
        this.setState({ [alertType]: true })
        setTimeout(() => this.setState({ [alertType]: false }), 5000)
      }
  
     consultarPerfiles = async()=>{   

        const headers = {
            codUsuario: 'AKIM',
            token: 'abc123',
            'Content-Type': 'application/json'
          }     
          const body = {
          }

          fetch(`${VENTAS_URL}/perfiles`, {
            method: 'GET',
            headers
          })
            .then(response => response.json())
            .then(data => {
                  console.log(data);
                  this.setState({
                    listaPerfiles: data.perfil 
                  })
            })
            .catch(err => {
              this.setState({ error: true, mensaje: 'Error interno' })
              setTimeout(() => {
                this.setState({ error: false, mensaje: '' })
              }, 3000)
            })

    }

    limpiarCachePerfiles = async()=>{
        const headers = {
            codUsuario: 'AKIM',
            token: 'abc123',
            'Content-Type': 'application/json'
          }     
          const body = {
          }
  
          fetch(`${VENTAS_URL}/perfiles/clear`, {
            method: 'GET',
            headers
          })
            .then(response => response.json())
            .then(data => {
                  console.log(data);
                  this.consultarPerfiles();
            })
            .catch(err => {
              this.setState({ error: true, mensaje: 'Error interno' })
              setTimeout(() => {
                this.setState({ error: false, mensaje: '' })
              }, 3000)
            })
  
    }

    actualizarPerfil = async(objPerfil)=>{
        const headers = {
          codUsuario: 'AKIM',
          token: 'abc123',
          'Content-Type': 'application/json'
        }     
        const body = objPerfil;
  
        fetch(`${VENTAS_URL}/perfiles/actualizar`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(body)
        })
          .then(response => response.json())
          .then(data => {
                console.log(data);
                this.setState({
                  modalEditarPerfil: false 
                })
                this.showAlert('alertRegistroSuccess')
                this.limpiarCachePerfiles();
          })
          .catch(err => {
            this.setState({ error: true, mensaje: 'Error interno' })
            this.showAlert('alertRegistroError')
            setTimeout(() => {
              this.setState({ error: false, mensaje: '' })
            }, 3000)
          })
  
      }

      registrarPerfil = async(objPerfil)=>{
        const headers = {
          codUsuario: 'AKIM',
          token: 'abc123',
          'Content-Type': 'application/json'
        }     
        const body = objPerfil;
  
        fetch(`${VENTAS_URL}/perfiles`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(body)
        })
          .then(response => response.json())
          .then(data => {
                console.log(data);
                this.setState({
                  modalEditarPerfil: false 
                })
                this.showAlert('alertRegistroSuccess')
                this.limpiarCachePerfiles();
          })
          .catch(err => {
            this.setState({ error: true, mensaje: 'Error interno' })
            this.showAlert('alertRegistroError')
            setTimeout(() => {
              this.setState({ error: false, mensaje: '' })
            }, 3000)
          })
  
      }

    guardarPerfil = () => {

        let perfil = {}
          perfil.perfilDescripcion = this.state.perfilDescripcion
          perfil.perfilActivo  = this.state.perfilActivo

        if (this.state.indiceEditar > 0) {
            perfil.perfilId = this.state.perfilId
          this.actualizarPerfil(perfil);
        } 
        else{
          this.registrarPerfil(perfil);  
        }
        
      } 

     editarPerfil = (indiceEditar,objPerfil) =>{

        this.setState({
            perfilId: objPerfil.perfilId,
            perfilDescripcion: objPerfil.perfilDescripcion
            
        })
             this.abrirModalEditarPerfil(indiceEditar);
             
      } 

      eliminarPerfilPorId = async(perfilId)=>{
        const headers = {
            codUsuario: 'AKIM',
            token: 'abc123',
            'Content-Type': 'application/json'
          }     
          const body = {
          }
    
          fetch(`${VENTAS_URL}/perfiles/delete/${perfilId}`, {
            method: 'DELETE',
            headers
          })
            .then(response => response.json())
            .then(data => {
                  console.log(data);
                  this.showAlert('alertEliminarSuccess')
                  this.limpiarCachePerfiles();
            })
            .catch(err => {
              this.setState({ error: true, mensaje: 'Error interno' })
              this.showAlert('alertEliminarError')
              setTimeout(() => {
                this.setState({ error: false, mensaje: '' })
              }, 3000)
            })
    
    }

     eliminarPerfil = (indice,perfilId) => {
        //let openAlert = this.props.openAlert
        var listaPerfiles = [...this.state.listaPerfiles]
        if (indice > -1) {
            listaPerfiles.splice(indice, 1)
          this.setState({ listaPerfiles })
        }
    
        this.eliminarPerfilPorId(perfilId);
      }

      abrirModalEditarPerfil (indiceEditar) {      
        this.setState({ modalEditarPerfil: true,
                        indiceEditar
                      })    
        }  

       cerrarModalEditarPerfil () {
            this.setState({ 
                           modalEditarPerfil: false
                          })
          }    
          
        onChangeValue = e => {
            console.log(e.target.value);
            this.setState({ [e.target.name]: e.target.value })
          }
        
     functionMostrarModalPerfiles () { 
            if (this.state.modalEditarPerfil) {
              return (
                <div>
                  <PerfilModal
                    cerrarModalEditarPerfil={this.cerrarModalEditarPerfil} 
                    onChangeValue = {this.onChangeValue}  
                    perfilDescripcion = {this.state.perfilDescripcion}
                    guardarPerfil = {this.guardarPerfil}
                  />
                </div>
              )
            }
          }        

    render() {
        const {
            alertRegistroSuccess,
            alertRegistroError,
            alertEliminarSuccess,
            alertEliminarError
          } = this.state
        return (
            <div>
                <div className="row">
                  <div className="col-sm-1">
                     <button className="btn btn-primary btn-sm" style={{ margin: "15px 15px" }}
                      onClick={e =>
                        this.abrirModalEditarPerfil(0)}>
                          NUEVO PERFIL
                    </button>
                  </div>
            </div>
                <div className='wrapper tableFdv'>
                 <div className='tableWrapper'>
                    <table
                    className='table table-hover'
                    style={{ marginBottom: '100px' }}
                    >
                    <thead className='table-head'>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                            <th></th>
                            <th></th>

                        </tr>
                    </thead>
                        <TablaPerfil
                            listaPerfiles={this.state.listaPerfiles}
                            eliminarPerfil = {this.eliminarPerfil}
                            editarPerfil = {this.editarPerfil}
                        />
                    </table>
                </div>
              </div>
              {this.functionMostrarModalPerfiles()}
              { alertRegistroSuccess && (
                  <Alert
                    type='alert-success'
                    icon='ion-checkmark-circled'
                    closeAlert={this.closeAlertRegistroSuccess}
                  >
                    <p>Se registró el perfil correctamente .</p>
                  </Alert>
                )}

              { alertRegistroError && (
                <Alert
                  type='alert-warning'
                  icon='ion-alert-circled'
                  closeAlert={this.closeAlertRegistroError}
                >
                  <p>Hubo un error al registrar el perfil.</p>
                </Alert>
              )}	
                { alertEliminarSuccess && (
                  <Alert
                    type='alert-success'
                    icon='ion-checkmark-circled'
                    closeAlert={this.closeAlertRegistroSuccess}
                  >
                    <p>Se eliminó el perfil correctamente .</p>
                  </Alert>
                )}

              { alertRegistroError && (
                <Alert
                  type='alert-warning'
                  icon='ion-alert-circled'
                  closeAlert={this.closeAlertRegistroError}
                >
                  <p>Hubo un error al eliminar el perfil.</p>
                </Alert>
              )}	           
            </div>
        );
    }
}

export default Perfil;