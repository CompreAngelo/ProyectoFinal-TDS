import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'

export const EnviarCorreo = async (email, newPassword) => {
  const ServerID = 'service_n2isgmk'
  const TemplateID = 'template_vyc3t7s'
  const PublicKey = '8djVy-CUJiOVQd-Jw'
  const UserID = '8djVy-CUJiOVQd-Jw' // Reemplaza con tu User ID de EmailJS

  emailjs.init(PublicKey)

  try {
    const params = {
      name: 'angel', // en futuro poner nombre del usuario logeado
      email: email, // Reemplaza con el nombre del destinatario si es necesario
      from_name: 'DIGESETT', // Reemplaza con tu nombre o nombre de la empresa
      recipient: email,
      message: newPassword
    }

    const response = await emailjs.send(ServerID, TemplateID, params, UserID)

    if (response.text === 'OK') {
      toast.success(`El correo fue enviado correctamente a ${email}`);
    } else {
      toast.error('Error al enviar el correo: ' + response.text);
    }
  } catch (error) {
    toast.error('Error al enviar el correo: ' + JSON.stringify(error));
  }
}

/*export const Contacto = async (email, NombreUsuario, description) => {
  const ServerID = 'SidgotechServerid'
  const TemplateID = 'template_ea98osq'
  const PublicKey = 'iSr7Pd9VXatQCXVJZ'
  const UserID = 'iSr7Pd9VXatQCXVJZ' // Reemplaza con tu User ID de EmailJS

  emailjs.init(PublicKey)

  try {
    const params = {
      recipient: email,
      Name: NombreUsuario,
      from_name: 'Sidgo Web Site',
      message: description
    }

    const response = await emailjs.send(ServerID, TemplateID, params, UserID)

    if (response.text === 'OK') {
      const notify = SuccessNotifications(
        'El correo fue enviado correctamente a Nuestro equipo, ¡Nos comunicaremos Pronto!'
      )
      notify()
    } else {
      const notify = ErrorNotifications(
        'Error al enviar el correo: ' + response.text
      )
      notify() // Debes invocar la función interna para mostrar la notificación
    }
  } catch (error) {
    const notify = ErrorNotifications(
      'Error al enviar el correo: ' + error.message
    )
    notify() // Debes invocar la función interna para mostrar la notificación
  }
}
*/