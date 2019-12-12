import React, { Component } from 'react';

export default class Unauthorized extends Component {

  render() {
    return (
        <div class="col-md-12 page-404">
            <div class="number font-green">401</div>
            <div class="details">
                <h3>No tiene autorización para realizar esta acción.</h3>
                <p>Al parecer, el recurso que está buscando no se encuentra disponible.</p>
                <p>Por favor, autentíquese nuevamente o comuníquese con el administrador del sistema.</p>
                <br/>
                <p><a href="/login/" class="btn red btn-outline">Volver al inicio</a></p>
            </div>
        </div>        
    );
  }
}