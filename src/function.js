/* se crean funcion genericas para usar en todo el proyecto */
import Swal from 'sweetalert2'
import { nextTick } from '@vue/runtime-core'

/* funcion para las alertas */
export function show_alert(msj, icon, focus) {
  if (focus != '') {
    nextTick(() => focus.value.focus())
  }
  Swal.fire({
    title: msj,
    icon: icon,
    buttonsStyling: true
  })
}

/* funcion para  */
export function confirmation(name, url, redirect) {
  const alert = Swal.mixin({ buttonsStyling: true })
  alert
    .fire({
      title: '¿Está seguro de eliminar ' + name + '?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "<i class='fa solid fa-check></i> Si borrar",
      cancelButtonText: "<i class='fa regular fa-ban'></i> Cancelar"
    })
    .then((result) => {
      if (result.isConfirmed) {
      }
    })
}

/* funcion para mandar la llamada */
export async function sendRequest(method, params, url, redirect = '') {}
