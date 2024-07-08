import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Usare este css para modificar las notificaciones para ahorar espacio del programa(oite steve XD)
import '../../contact.css'

// Función genérica para mostrar notificaciones
// El único parámetro es el mensaje
export function SuccessNotifications(message) {
  const showtoastMessage = () => {
    toast.success(message, { position: toast.POSITION.TOP_CENTER, className: "notifications-message", });

  }

  return showtoastMessage;
}

export function ErrorNotifications(message) {
  const showtoastMessage = () => {
    toast.error(message, { position: toast.POSITION.TOP_CENTER, className: "notifications-message", });
  }

  return showtoastMessage;
}


