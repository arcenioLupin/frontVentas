
import React from "react";
import { Panel } from "react-bootstrap";
import Modal from "../../components/Modal";


const PerfilModal = props => (
 
    <div>
        <Modal isOpen idModal='nuevo-perfil' modalSize='modal-dialog modal-lg' title='Creación - Edición Perfil' closeModal={props.cerrarModalEditarPerfil} >
            <div className="card card-plain card-lg">
            <div className="row">
                    <div className="col-sm-2">
                        <label>Nombre del Perfil:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" name="perfilDescripcion" className="form-control" value={props.perfilDescripcion}
                                    onChange={props.onChangeValue} />
                    </div>
                    <div className="col-sm-6">
                        <center>
                                <button className="btn btn-primary btn-sm" style={{ margin: "15px 15px" }}
                                   onClick={props.guardarPerfil} >
                                    GUARDAR
                               </button>
                               <button className="btn btn-primary btn-sm" style={{ margin: "15px 15px" }}
                                    >
                                    LIMPIAR
                               </button>
                        </center>
                     </div>       
                    
            </div> 

            </div>

        </Modal>

    </div >

);

export default PerfilModal;