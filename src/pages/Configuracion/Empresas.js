import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css'
import * as qs from 'query-string'
import { VENTAS_URL} from '../../constants'
import {fetchEmpresas} from '../../services/api'
import TablaEmpresas from '../Configuracion/TablaEmpresas'
import EmpresaModal from '../Configuracion/EmpresaModal'
import Alert from '../../components/Alert'
class Empresas extends Component {

    constructor (props) {
        super(props)
        this.state ={
         listaEmpresas : [],
         modalEditarEmpresa:false,
         empresaId:null,
         codigoEmpresa:'',
         nombreEmpresa:'',
         giro:'',
         sigla:'',
         repLegal:'',
         direccion:'',
         rut:'',
         comboTipoEmpresa:'',
         comboAlcanceEmpresa:'',
         rutRepLegal:'',
         pais:'',
         departamento:'',
         provincia:'',
         ciudad:'',
         comboRegimenLaboral:'',
         telefono:'',
         telefonoEmpresa:'',
         email:'',
         sitioWeb:'',
         regEsp: '0',
         indiceEditar: 0,
         empresaRutaLogo:'',
         alertRegistroSuccess: false,
         alertRegistroError: false,
         alertEliminarSuccess: false,
         alertEliminarError: false
         
        }

        this.abrirModalEditarEmpresa = this.abrirModalEditarEmpresa.bind(this)
        this.cerrarModalEditarEmpresa = this.cerrarModalEditarEmpresa.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
        this.handleAllChecked = this.handleAllChecked.bind(this)
        this.guardarEmpresa = this.guardarEmpresa.bind(this)
        this.editarEmpresa = this.editarEmpresa.bind(this)
    }

    componentDidMount(){
      this.consultarEmpresas();
    }

    onChangeValue = e => {
      console.log(e.target.value);
      this.setState({ [e.target.name]: e.target.value })
    }
    
    handleAllChecked = e => {
      console.log(e.target.checked);
      if (!e.target.checked) {
        this.setState({
         regEsp:'0'
        })
      } else {
        this.setState({
          regEsp:'1'
         })
      }
    }	

    showAlert = alertType => {
      this.setState({ [alertType]: true })
      setTimeout(() => this.setState({ [alertType]: false }), 5000)
    }

    consultarEmpresas = async()=>{   

        const headers = {
            codUsuario: 'AKIM',
            token: 'abc123',
            'Content-Type': 'application/json'
          }     
          const body = {
          }

          fetch(`${VENTAS_URL}/empresas`, {
            method: 'GET',
            headers
          })
            .then(response => response.json())
            .then(data => {
                  console.log(data);
                  this.setState({
                    listaEmpresas: data.empresa 
                  })
            })
            .catch(err => {
              this.setState({ error: true, mensaje: 'Error interno' })
              setTimeout(() => {
                this.setState({ error: false, mensaje: '' })
              }, 3000)
            })

    }

    limpiarCacheEmpresas = async()=>{
      const headers = {
          codUsuario: 'AKIM',
          token: 'abc123',
          'Content-Type': 'application/json'
        }     
        const body = {
        }

        fetch(`${VENTAS_URL}/empresas/clear`, {
          method: 'GET',
          headers
        })
          .then(response => response.json())
          .then(data => {
                console.log(data);
                this.consultarEmpresas();
          })
          .catch(err => {
            this.setState({ error: true, mensaje: 'Error interno' })
            setTimeout(() => {
              this.setState({ error: false, mensaje: '' })
            }, 3000)
          })

  }

  eliminarEmpresaPorId = async(empresaId)=>{
    const headers = {
        codUsuario: 'AKIM',
        token: 'abc123',
        'Content-Type': 'application/json'
      }     
      const body = {
      }

      fetch(`${VENTAS_URL}/empresas/delete/${empresaId}`, {
        method: 'DELETE',
        headers
      })
        .then(response => response.json())
        .then(data => {
              console.log(data);
              this.showAlert('alertEliminarSuccess')
              this.limpiarCacheEmpresas();
        })
        .catch(err => {
          this.setState({ error: true, mensaje: 'Error interno' })
          this.showAlert('alertEliminarError')
          setTimeout(() => {
            this.setState({ error: false, mensaje: '' })
          }, 3000)
        })

}

    registrarEmpresa = async(objEmpresa)=>{
      const headers = {
        codUsuario: 'AKIM',
        token: 'abc123',
        'Content-Type': 'application/json'
      }     
      const body = objEmpresa;

      fetch(`${VENTAS_URL}/empresas`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(data => {
              console.log(data);
              this.setState({
                modalEditarEmpresa: false 
              })
              this.showAlert('alertRegistroSuccess')
              this.limpiarCacheEmpresas();
        })
        .catch(err => {
          this.setState({ error: true, mensaje: 'Error interno' })
          this.showAlert('alertRegistroError')
          setTimeout(() => {
            this.setState({ error: false, mensaje: '' })
          }, 3000)
        })

    }

    actualizarEmpresa = async(objEmpresa)=>{
      const headers = {
        codUsuario: 'AKIM',
        token: 'abc123',
        'Content-Type': 'application/json'
      }     
      const body = objEmpresa;

      fetch(`${VENTAS_URL}/empresas/actualizar`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(data => {
              console.log(data);
              this.setState({
                modalEditarEmpresa: false 
              })
              this.showAlert('alertRegistroSuccess')
              this.limpiarCacheEmpresas();
        })
        .catch(err => {
          this.setState({ error: true, mensaje: 'Error interno' })
          this.showAlert('alertRegistroError')
          setTimeout(() => {
            this.setState({ error: false, mensaje: '' })
          }, 3000)
        })

    }

    abrirModalEditarEmpresa (indiceEditar) {      
      this.setState({ modalEditarEmpresa: true,
                      indiceEditar,             
                    })    
      }

    cerrarModalEditarEmpresa () {
        this.setState({ 
                       modalEditarEmpresa: false
                      })
      }
    

      functionMostrarModalEmpresas () { 
        if (this.state.modalEditarEmpresa) {
          return (
            <div>
              <EmpresaModal
                cerrarModalEditarEmpresa={this.cerrarModalEditarEmpresa} 
                onChangeValue = {this.onChangeValue}  
                handleAllChecked = {this.handleAllChecked}
                codigoEmpresa = {this.state.codigoEmpresa}  
                nombreEmpresa = {this.state.nombreEmpresa}
                giro = {this.state.giro}
                sigla = {this.state.sigla}
                repLegal = {this.state.repLegal}
                direccion = {this.state.direccion}
                rut = {this.state.rut}
                comboTipoEmpresa = {this.state.comboTipoEmpresa}
                comboAlcanceEmpresa = {this.state.comboAlcanceEmpresa}
                rutRepLegal = {this.state.rutRepLegal}
                pais = {this.state.pais}
                departamento = {this.state.departamento}
                provincia = {this.state.provincia}
                ciudad = {this.state.ciudad}
                comboRegimenLaboral = {this.state.comboRegimenLaboral}
                telefono = {this.state.telefono}
                telefonoEmpresa = {this.state.telefonoEmpresa}
                email = {this.state.email}
                sitioWeb = {this.state.sitioWeb}
                regEsp = {this.state.regEsp}
                guardarEmpresa = {this.guardarEmpresa}
              />
            </div>
          )
        }
      }

      guardarEmpresa = () => {

        let empresa = {}
          empresa.empresaCodigo = this.state.codigoEmpresa
          empresa.empresaRazonSoc = this.state.nombreEmpresa
          empresa.empresaGiro = this.state.giro
          empresa.empresaSigla = this.state.sigla
          empresa.empresaRepLegal = this.state.repLegal
          empresa.empresaDireccion = this.state.direccion
          empresa.empresaCodPais = this.state.pais
          empresa.empresaCodProv = this.state.provincia
          empresa.empresaCodDep = this.state.departamento
          empresa.empresaTelf = this.state.telefonoEmpresa
          empresa.empresaEmail = this.state.email
          empresa.empresaRegEsp = this.state.regEsp
          empresa.empresaRutaLogo = this.state.empresaRutaLogo
          empresa.empresaTipo = this.state.comboTipoEmpresa
          empresa.empresaRutRepLeg = this.state.rutRepLegal
          empresa.empresaCiudad = this.state.ciudad
          empresa.empresaRegLab = this.state.comboRegimenLaboral
          empresa.empresaSiteWeb = this.state.sitioWeb
          empresa.empresaAbiCerr = this.state.comboAlcanceEmpresa
          empresa.empresaRuc = this.state.rut

        if (this.state.indiceEditar > 0) {
          empresa.empresaId = this.state.empresaId
          this.actualizarEmpresa(empresa);
        } 
        else{
          this.registrarEmpresa(empresa);  
        }
        
      } 
      
     editarEmpresa = (indiceEditar,objEmpresa) =>{

       this.setState({
             codigoEmpresa: objEmpresa.empresaCodigo,
             nombreEmpresa: objEmpresa.empresaRazonSoc,
             giro:          objEmpresa.empresaGiro,
             sigla:         objEmpresa.empresaSigla,
             repLegal:      objEmpresa.empresaRepLegal,
             direccion:     objEmpresa.empresaDireccion,
             pais:          objEmpresa.empresaCodPais,
             provincia:     objEmpresa.empresaCodProv,
             departamento:  objEmpresa.empresaCodDep,
             telefonoEmpresa: objEmpresa.empresaTelf,
             email:          objEmpresa.empresaEmail,
             regEsp:          objEmpresa.empresaRegEsp,
             empresaRutaLogo: objEmpresa.empresaRutaLogo,
             comboTipoEmpresa: objEmpresa.empresaTipo,
             rutRepLegal: objEmpresa.empresaRutRepLeg,
             ciudad: objEmpresa.empresaCiudad,
             comboRegimenLaboral: objEmpresa.empresaRegLab,
             sitioWeb: objEmpresa.empresaSiteWeb,
             comboAlcanceEmpresa: objEmpresa.empresaAbiCerr,
             rut: objEmpresa.empresaRuc,
             empresaId: objEmpresa.empresaId
             

       })
            this.abrirModalEditarEmpresa(indiceEditar);
            
     } 

    /*eliminarEmpresa = (index)=>{
     console.log(index);
    }*/

    eliminarEmpresa = (indice,empresaId) => {
      //let openAlert = this.props.openAlert
      var listaEmpresas = [...this.state.listaEmpresas]
      if (indice > -1) {
        listaEmpresas.splice(indice, 1)
        this.setState({ listaEmpresas })
      }
  
      this.eliminarEmpresaPorId(empresaId);
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
                        this.abrirModalEditarEmpresa(0)}>
                          NUEVA EMPRESA
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
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                            <th>GIRO</th>
                            <th>TIPO</th>
                            <th>RE. LEGAL</th>
                            <th>TELEFONO</th>                       
                            <th>EMAIL</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                        <TablaEmpresas
                            listaEmpresas={this.state.listaEmpresas}
                            eliminarEmpresa = {this.eliminarEmpresa}
                            abrirModalEditarEmpresa = {this.abrirModalEditarEmpresa}
                            editarEmpresa = {this.editarEmpresa}
                        />
                    </table>
                </div>
              </div>
                 {this.functionMostrarModalEmpresas()}
                 { alertRegistroSuccess && (
                  <Alert
                    type='alert-success'
                    icon='ion-checkmark-circled'
                    closeAlert={this.closeAlertRegistroSuccess}
                  >
                    <p>Se registró la empresa correctamente .</p>
                  </Alert>
                )}

              { alertRegistroError && (
                <Alert
                  type='alert-warning'
                  icon='ion-alert-circled'
                  closeAlert={this.closeAlertRegistroError}
                >
                  <p>Hubo un error al registrar la empresa.</p>
                </Alert>
              )}	
                { alertEliminarSuccess && (
                  <Alert
                    type='alert-success'
                    icon='ion-checkmark-circled'
                    closeAlert={this.closeAlertRegistroSuccess}
                  >
                    <p>Se eliminó la empresa correctamente .</p>
                  </Alert>
                )}

              { alertRegistroError && (
                <Alert
                  type='alert-warning'
                  icon='ion-alert-circled'
                  closeAlert={this.closeAlertRegistroError}
                >
                  <p>Hubo un error al eliminar la empresa.</p>
                </Alert>
              )}	              
            </div>
        );
    }
}

export default Empresas
