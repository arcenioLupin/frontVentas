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
                        <input type="text" name="documentoIdentidad" className="form-control" 
                                />
                    </div>
                    <div className="col-sm-2">
                        <label>Nombre:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="nombres" className="form-control"
                                 />
                    </div>
            </div> 
            <div className="row">
                    <div className="col-sm-2">
                        <label>Giro:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="documentoIdentidad" className="form-control" 
                                />
                    </div>
                    <div className="col-sm-2">
                        <label>Sigla:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="nombres" className="form-control"
                                 />
                    </div>
            </div>  
            <div className="row">
                    <div className="col-sm-2">
                        <label>Representante Legal:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="documentoIdentidad" className="form-control" 
                                />
                    </div>
                    <div className="col-sm-2">
                        <label>Dirección:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="nombres" className="form-control"
                                 />
                    </div>
            </div>                     
            <div className="row">
                            <center>
                                <button className="btn btn-primary btn-sm" style={{ margin: "15px 15px" }}
                                    >
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