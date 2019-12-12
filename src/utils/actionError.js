export function renderError(lista, mensaje = "Error en el servidor") {
  return { data: { [lista]: [], error: true, mensaje, servicio: lista } };
}

export function evalAction(data, lista) {
  if (
    data.estadoTrama === "2" ||
    data.estadoTrama === "1" ||
    data.estadoTrama === "0" ||
    data.estadoTrama === undefined
  ) {
    return { data };
  } else {
    return renderError(lista, data.mensaje);
  }
}

export function serverError(error, lista) {
  if (error.response) {
    if (error.response.status === 401) {
      window.history.pushState({}, "", "/login/");
      window.location.reload();
    }
    return renderError(
      lista,
      `${error.response.status} ${error.response.statusText}`
    );
  }

  return renderError(lista);
}
