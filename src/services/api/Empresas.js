import { VENTAS_URL, customAxios, IDUSUARIO } from '../../constants'
import {
    FETCH_EMPRESAS
} from '../../actions/actionTypes'
import { evalAction, serverError } from '../../utils/actionError'

export function fetchEmpresas (
  nroPag = 1
) {
  const config = {
    headers: {
      idUsuario: IDUSUARIO,
      indPaginado: 'S',
      nroPag,
      cantidadxPag: '10'
    },
    params: {
    }
  }

  const request = customAxios
    .get(`${VENTAS_URL}/empresas`, config)
    .then(({ data }) => evalAction(data, 'listar'))
    .catch(error => serverError(error, 'listar'))

  return {
    type: FETCH_EMPRESAS,
    payload: request
  }
}
/*
export function fetchActualizarSolicitudCredito (
  codSoliCred,
  codEstado,
  codPerso,
  numProfVeh,
  numTelfMovil,
  dirCorreo,
  obseCrea,
  tipoSoliCred,
  codRespFina,
  canPlazMes,
  codMonedaProf,
  valVtaTotFin,
  txtObserGestBanc,
  codEstadoAprob,
  flagActualiza,
  codUsuaSid
) {
  const config = {
    headers: {
      idUsuario: IDUSUARIO
    }
  }

  const data = {
    codSoliCred,
    codEstado,
    codPerso,
    numProfVeh,
    numTelfMovil,
    dirCorreo,
    obseCrea,
    tipoSoliCred,
    codRespFina,
    canPlazMes,
    codMonedaProf,
    valVtaTotFin,
    txtObserGestBanc,
    codEstadoAprob,
    flagActualiza,
    codUsuaSid
  }

  return customAxios
    .put(`${SOLCRE_URL}/api/solicitudes`, data, config)
    .then(({ data }) => evalAction(data, 'actualizar'))
    .catch(error => serverError(error, 'actualizar'))
}

export function fetchActualizarGestionBancaria (
  codSoliCred,
  codBanco,
  valMontFin,
  codMoneSoli,
  valMontSolGestBanc,
  porcGestBanc,
  fecIngrGestBanc,
  fecIngrRiesGestBanc,
  fecAprobCartBan,
  fecResuGestBanc,
  codEstaGestBanc,
  txtObseGestBanc,
  codUsuaSid
) {
  const config = {
    headers: {
      idUsuario: IDUSUARIO
    }
  }

  const data = {
    codSoliCred,
    codBanco,
    valMontFin,
    codMoneSoli,
    valMontSolGestBanc,
    porcGestBanc,
    fecIngrGestBanc,
    fecIngrRiesGestBanc,
    fecAprobCartBan,
    fecResuGestBanc,
    codEstaGestBanc,
    txtObseGestBanc,
    codUsuaSid
  }

  return customAxios
    .put(`${SOLCRE_URL}/api/solicitudes/actualizarGestion`, data, config)
    .then(({ data }) => evalAction(data, 'actualizarGestionBancaria'))
    .catch(error => serverError(error, 'actualizarGestionBancaria'))
}

export function fetchRegistrarSolicitudCredito (
  codClie,
  tipSoliCred,
  codMoneda,
  codBanco,
  estado,
  valMonFin,
  canPlazMes,
  txtObseCrea,
  codResFina,
  numTelfMovil,
  dirCorreo,
  numProfVeh,
  valVtaProf,
  flagRegistro,
  compania
) {
  const config = {
    headers: {
      idUsuario: IDUSUARIO
    }
  }

  const data = {
    codClie,
    tipSoliCred,
    codMoneda,
    codBanco,
    estado,
    valMonFin,
    canPlazMes,
    txtObseCrea,
    codResFina,
    numTelfMovil,
    dirCorreo,
    numProfVeh,
    valVtaProf,
    flagRegistro,
    compania
  }

  return customAxios
    .post(`${SOLCRE_URL}/api/solicitudes`, data, config)
    .then(({ data }) => evalAction(data, 'registrar'))
    .catch(error => serverError(error, 'registrar'))
}

export function updateSolicitudCredito (solicitudCredito) {
  const config = {
    headers: {
      idUsuario: IDUSUARIO
    }
  }

  const data = {
    codSoliCred: solicitudCredito.codSoliCred,
    codBanco: solicitudCredito.codBanco,
    txtOficBanc: solicitudCredito.txtOficBanc,
    numFax: solicitudCredito.numFax,
    fecAprobCartBan: solicitudCredito.fecAprobCartBan,
    codMoneCartBanc: solicitudCredito.codMoneCartBanc,
    valMoneAprobBanc: solicitudCredito.valMoneAprobBanc,
    txtNombEjecBanc: solicitudCredito.txtNombEjecBanc,
    txtRutaCartBanc: solicitudCredito.txtRutaCartBanc,
    numTeleFijoEjec: solicitudCredito.numTeleFijoEjec,
    numCeluEjec: solicitudCredito.numCeluEjec
  }

  return customAxios
    .post(`${SOLCRE_URL}/solicitudes/actualizarCartaBanco`, data, config)
    .then(({ data }) => evalAction(data, 'actualizarCartaBanco'))
    .catch(error => serverError(error, 'actualizarCartaBanco'))
}

export function fetchPermisos (codSoliCred) {
  const config = {
    headers: {
      idUsuario: IDUSUARIO
    }
  }

  const request = customAxios
    .get(`${SOLCRE_URL}/api/solicitudes/${codSoliCred}/permisos`, config)
    .then(({ data }) => evalAction(data, 'listaPermisos'))
    .catch(error => serverError(error, 'listaPermisos'))

  return {
    type: FETCH_PERMISOS,
    payload: request
  }
}

export function fetchRoles (
  codRol,
  codRolJefFi,
  nroProforma,
  codClie,
  codZona,
  flag,
  flagEdit
) {
  const config = {
    headers: {
      idUsuario: IDUSUARIO
    },
    params: {
      codRol,
      codRolJefFi,
      nroProforma,
      codClie,
      codZona,
      flag,
      flagEdit
    }
  }

  const request = customAxios
    .get(`${SOLCRE_URL}/api/roles`, config)
    .then(({ data }) => evalAction(data, 'listarRoles'))
    .catch(error => serverError(error, 'listarRoles'))

  return {
    type: FETCH_ROLES,
    payload: request
  }
}


export function fetchRegistrarSolicitudHistorico (
  codSoliCred,
  valLcActu,
  fecPlazo,
  valLcUtil
) {
  const config = {
    headers: {
      idUsuario: IDUSUARIO
    }
  }

  const data = {
    codSoliCred,
    valLcActu,
    fecPlazo,
    valLcUtil
  }

  return customAxios
    .post(`${SOLCRE_URL}/api/solicitudHistorico`, data, config)
    .then(({ data }) => evalAction(data, 'registrarSolicitudHistorico'))
    .catch(error => serverError(error, 'registrarSolicitudHistorico'))
}


export function fetchRegistrarHistoricoOperaciones (
  codCredSoliHist,
  codCredSoli,
  codCia,
  codTipoCred,
  codOper,
  codMoneda,
  valMontoCred,
  canLetras,
  valTea,
  valSaldo,
  fecUltVenc,
  codEstadoOp,
  fecEmiOp,
  valPorcCi,
  valValGar,
  valPorcRatGar,
  codClie
) {
  const config = {
    headers: {
      idUsuario: IDUSUARIO
    }
  }

  const data = {
    codCredSoliHist,
    codCredSoli,
    codCia,
    codTipoCred,
    codOper,
    codMoneda,
    valMontoCred,
    canLetras,
    valTea,
    valSaldo,
    fecUltVenc,
    codEstadoOp,
    fecEmiOp,
    valPorcCi,
    valValGar,
    valPorcRatGar,
    codClie
  }

  // console.log(data)

  return customAxios
    .post(`${SOLCRE_URL}/api/historicoOperaciones`, data, config)
    .then(({ data }) => evalAction(data, 'registrarHistoricoOperaciones'))
    .catch(error => serverError(error, 'registrarHistoricoOperaciones'))
    
}*/