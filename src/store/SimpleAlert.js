import Swal from 'sweetalert2';

const showAlert = (type, message, title = "Ok") => {
  switch (type) {
    case 'success':
      return Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#1B365D'
      }).then(() => true);
    case 'error':
      return Swal.fire({
        title: '¡Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'red'
      }).then(() => true);
    case 'warning':
      return Swal.fire({
        title: 'Advertencia',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, hazlo',
        confirmButtonColor: '#FFC508',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: 'red'
      }).then((result) => {
        return result.isConfirmed ? true : false;
      });
    case 'info':
      return Swal.fire({
        title: 'Información',
        text: message,
        icon: 'info',
        confirmButtonText: 'Ok, gracias',
        confirmButtonColor: 'blue'
      }).then(() => true);
    default:
      return Swal.fire({
        title: 'Alerta',
        text: 'Este es un mensaje por defecto.',
        icon: 'question',
        confirmButtonText: 'Ok'
      }).then(() => true);
  }
};

export default showAlert;
