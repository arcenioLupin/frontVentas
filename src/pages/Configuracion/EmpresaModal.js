import React from "react";
import { Panel } from "react-bootstrap";
import Modal from "../../components/Modal";


const EmpresaModal = props => (
 
    <div>
        <Modal isOpen idModal='nueva-empresa' modalSize='modal-dialog modal-lg' title='Creación - Edición Empresa' closeModal={props.cerrarModalEditarEmpresa} >
            <div className="card card-plain card-lg">
            <div className="row">
                    <div className="col-sm-2">
                        <label>Codigo Empresa:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="codigoEmpresa" className="form-control" value={props.codigoEmpresa}
                                    onChange={props.onChangeValue} />
                    </div>
                    <div className="col-sm-2">
                        <label>Nombre:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="nombreEmpresa" className="form-control" value={props.nombreEmpresa}
                               onChange={props.onChangeValue} />
                    </div>
            </div> 
            <div className="row">
                    <div className="col-sm-2">
                        <label>Giro:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="giro" className="form-control" value={props.giro}
                               onChange={props.onChangeValue}  />
                    </div>
                    <div className="col-sm-2">
                        <label>Sigla:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="sigla" className="form-control" value={props.sigla}
                               onChange={props.onChangeValue} />
                    </div>
            </div>  
            <div className="row">
                    <div className="col-sm-2">
                        <label>Representante Legal:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="repLegal" className="form-control" value={props.repLegal}
                               onChange={props.onChangeValue} />
                    </div>
                    <div className="col-sm-2">
                        <label>Dirección:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="direccion" className="form-control" value={props.direccion}
                               onChange={props.onChangeValue}/>
                    </div>
            </div>  
            <div className="row">
                    <div className="col-sm-2">
                        <label>RUT:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="rut" className="form-control"  value={props.rut}
                               onChange={props.onChangeValue}/>
                    </div>
                    <div className="col-sm-2">
                        <label>Tipo Empresa:</label>
                    </div>
                    <div className="col-sm-4">
                            <div className="select">
                                    <select className='form-control' 
                                            id="comboTipoEmpresa" 
                                            name='comboTipoEmpresa'
                                            value={props.comboTipoEmpresa}
                                            onChange={props.onChangeValue} 
                                         >
                                            <option value="">SELECCIONE</option>
                                            <option value="EU">EU</option>
                                            <option value="EIRL">EIRL</option>
                                            <option value="SA">SA</option>
                                            <option value="SAA">SAA</option>
                                            <option value="SAC">SAC</option>
                                            <option value="SRL">SRL</option>
                                    </select>
                                    <div className='select-control-icon'><i className='ion-arrow-down-b' /></div>
                            </div>
                    </div>
            </div>
            <div className="row">
                    <div className="col-sm-2">
                        <label>Alacance:</label>
                    </div>
                    <div className="col-sm-4">
                        <div className="select">
                                        <select className='form-control' 
                                                id='comboAlcanceEmpresa'
                                                name='comboAlcanceEmpresa'
                                                value={props.comboAlcanceEmpresa}
                                                onChange={props.onChangeValue}
                                            >
                                            <option value="">SELECCIONE</option>
                                            <option value="1">CERRADA</option>
                                            <option value="2">ABIERTA</option>
                                        </select>
                                        <div className='select-control-icon'><i className='ion-arrow-down-b' /></div>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <label>RUT Rep. Legal:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="rutRepLegal" className="form-control" value={props.rutRepLegal}
                               onChange={props.onChangeValue} />
                    </div>
            </div>
            <div className="row">
                    <div className="col-sm-2">
                        <label>PAIS:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="pais" className="form-control" value={props.pais}
                               onChange={props.onChangeValue}/>
                    </div>
                    <div className="col-sm-2">
                        <label>Departamento:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="departamento" className="form-control" value={props.departamento}
                               onChange={props.onChangeValue}/>
                    </div>
            </div>  
            <div className="row">
                    <div className="col-sm-2">
                        <label>Provincia:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="provincia" className="form-control"  value={props.provincia}
                               onChange={props.onChangeValue} />
                    </div>
                    <div className="col-sm-2">
                        <label>Ciudad:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="ciudad" className="form-control"  value={props.ciudad}
                               onChange={props.onChangeValue} />
                    </div>
            </div>   
            <div className="row">
                    <div className="col-sm-2">
                        <label>Regimen laboral:</label>
                    </div>
                    <div className="col-sm-4">
                        <div className="select">
                                <select className='form-control' 
                                        id='comboRegimenLaboral' 
                                        name='comboRegimenLaboral'
                                        value={props.comboRegimenLaboral}
                                        onChange={props.onChangeValue} >

                                      <option value="">SELECCIONE</option>
                                      <option value="1">Regimen 1</option>
                                      <option value="2">Regimen 2</option>
                                </select>
                                <div className='select-control-icon'><i className='ion-arrow-down-b' /></div>
                            </div>
                    </div>
                    <div className="col-sm-2">
                        <label>Teléfono:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="telefono" className="form-control" value={props.telefono}
                               onChange={props.onChangeValue}/>
                    </div>
            </div> 
            <div className="row">
                    <div className="col-sm-2">
                        <label>Teléfono Empresa:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="telefonoEmpresa" className="form-control" value={props.telefonoEmpresa}
                               onChange={props.onChangeValue}/>
                    </div>
                    <div className="col-sm-2">
                        <label>Email:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="email" className="form-control" value={props.email}
                               onChange={props.onChangeValue} />
                    </div>
            </div>    
            <div className="row">
                    <div className="col-sm-2">
                        <label>Sitio Web:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="sitioWeb" className="form-control" value={props.sitioWeb}
                               onChange={props.onChangeValue}/>
                    </div>
                    <div className="col-sm-4">
                         <div className="checkbox checkbox-inline">
                            <label>
                                <input
                                    type="checkbox"   
                                    id='regEsp'
                                    name='regEsp'
                                    value={props.regEsp}
                                    checked={props.regEsp==='1'?"true":""}
                                    onClick={e =>props.handleAllChecked(e)}                                               
                                />
                                
                                <div className="checkbox-skin" />                                
                                    Es régimen especial                           
                            </label>
                           
                        </div>
                    </div>
                    <div className="col-sm-2">
                    
                    </div>
            </div>                                                 
            <div className="row">
                            <center>
                                <button className="btn btn-primary btn-sm" style={{ margin: "15px 15px" }}
                                   onClick={props.guardarEmpresa} >
                                    GUARDAR
                               </button>
                               <button className="btn btn-primary btn-sm" style={{ margin: "15px 15px" }}
                                    >
                                    LIMPIAR
                               </button>
                            </center>
            </div>

            </div>

        </Modal>

    </div >

);

export default EmpresaModal;