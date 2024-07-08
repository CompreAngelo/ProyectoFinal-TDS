export function generarContraseñaTemporal(longitud) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: longitud }, () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join('');
  }
  
 /* const contraseñaGenerada = generarContraseñaTemporal(8);
  console.log(contraseñaGenerada);*/
 