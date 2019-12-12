
import React from 'react'
import { Link } from 'react-router-dom'

const TablaEmpresas = props => (
  <tbody>
    {props.listaEmpresas.length ? (
      props.listaEmpresas.map((data, index) => (
        <tr key={index}>
          <td>{data.empresaCodigo}</td>
          <td>{data.empresaRazonSoc}</td>
          <td>{data.empresaGiro}</td>
          <td>{data.empresaTipo}</td>
          <td >{data.empresaRepLegal}</td>
          <td>{data.empresaTelf}</td>
          <td>{data.empresaEmail}</td>
          <td style={{ textAlign: "center" }} >
          <td className="col-xs-1" style={{ textAlign: "center" }}>
                 <button
                  className='btn btn-warning'
                  title='Aprobación'
                  onClick={e =>
                  props.abrirModalEditarEmpresa()
                  }
                  
                >
                    Editar
                </button>
          </td>
          </td>
          <td style={{ textAlign: "center" }} >
          <button
                  className='btn btn-warning'
                  title='Eliminar'
                  onClick={e =>
                    props.eliminarEmpresa(index)
                  }
                  
                >
                    Eliminar
                </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan='12'>
          <p style={{ textAling: 'center' }}>
            {' '}
            No existe registros para la busqueda !!
          </p>
        </td>
      </tr>
    )}
  </tbody>
)

export default TablaEmpresas
