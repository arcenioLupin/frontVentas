
import React from 'react'
import { Link } from 'react-router-dom'

const TablaPerfil = props => (
  <tbody>
    {props.listaPerfiles.length ? (
      props.listaPerfiles.map((data, index) => (
        <tr key={index}>
          <td></td>
          <td></td>
          <td>{data.perfilId}</td>
          <td>{data.perfilDescripcion}</td>
          <td className="col-xs-1" style={{ textAlign: "center" }}>
                 <button
                  className='btn btn-warning'
                  title='Editar'
                  onClick={e =>
                  props.editarPerfil(1,data)
                  }
                  
                >
                    Editar
                </button>
          </td>
          <td style={{ textAlign: "center" }} >
          <button
                  className='btn btn-warning'
                  title='Eliminar'
                  onClick={e =>
                    props.eliminarPerfil(index,data.perfilId)
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

export default TablaPerfil
