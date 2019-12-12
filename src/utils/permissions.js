let permissions = []
let selectedPermission = {}

export function loadPermissions (results) {
  permissions = results.listado
}

export function getPermission (permissionTag) {
  if (permissionTag) {
    selectedPermission = permissions.find(p => p.tag === permissionTag)
    return selectedPermission
  } else {
    return {}
  }
}

export function isPermissionValid (permissionTag) {
  let permissionActive = getPermission(permissionTag)
  return (
    typeof permissionActive === 'undefined' ||
    (permissionActive && permissionActive.valor === 'V')
  )
}

export function hasPermissionMessage () {
  return (
    selectedPermission &&
    (typeof selectedPermission.mensaje !== 'undefined' &&
      selectedPermission.mensaje !== null &&
      selectedPermission.mensaje !== '')
  )
}

export function validatePermissions (permissionTag) {
  selectedPermission = getPermission(permissionTag)
  /* if(!isPermissionValid()) {
    e.target.setAttribute('disabled','disabled');
  } */
  return selectedPermission
}
