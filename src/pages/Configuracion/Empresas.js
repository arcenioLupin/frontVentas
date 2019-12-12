import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css'
import * as qs from 'query-string'
import { VENTAS_URL} from '../../constants'
import {fetchEmpresas} from '../../services/api'
import TablaEmpresas from '../Configuracion/TablaEmpresas'
import EmpresaModal from '../Configuracion/EmpresaModal'
class Empresas extends Component {

    constructor (props) {
        super(props)
        this.state ={
         listaEmpresas : [],
         modalEditarEmpresa:false
        }

        this.abrirModalEditarEmpresa = this.abrirModalEditarEmpresa.bind(this)
        this.cerrarModalEditarEmpresa = this.cerrarModalEditarEmpresa.bind(this)
    }

    componentDidMount(){
      this.consultarEmpresas();
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

    abrirModalEditarEmpresa () {      
      this.setState({ modalEditarEmpresa: true})    
      }

    cerrarModalEditarEmpresa () {
        this.setState({ modalEditarEmpresa: false })
      }
    



      functionMostrarAprobacion () { 
        if (this.state.modalEditarEmpresa) {
          return (
            <div>
              <EmpresaModal
                cerrarModalEditarEmpresa={this.cerrarModalEditarEmpresa}              
              />
            </div>
          )
        }
      }

    eliminarEmpresa = (index)=>{
     console.log(index);
    }

    render() {
        return (
            <div>
                <div className="row">
                  <div className="col-sm-1">
                     <button className="btn btn-primary btn-sm" style={{ margin: "15px 15px" }}>
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
                        />
                    </table>
                </div>
              </div>
                 {this.functionMostrarAprobacion()}
            </div>
        );
    }
}

export default Empresas
