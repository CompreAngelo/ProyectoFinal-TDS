import React, {useState}from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
      try {
          const item = window.localStorage.getItem(key);
          return item ? JSON.parse(item) : initialValue;
      } catch (error) {
          console.log(error);
          return initialValue;
      }
  });

  const setValue = value => {
      try {
          const valueToStore = value instanceof Function ? value(storedValue) : value;
          setStoredValue(valueToStore);
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
          console.log(error);
      }
  };

  return [storedValue, setValue];
}
export function limpiarDatosLocalStorage() {
    // Eliminar los datos del usuario
    localStorage.removeItem('user');
    // Eliminar los datos de las multas
    localStorage.removeItem('multa');
    // Agrega aquí cualquier otro dato que necesites eliminar
}

export default useLocalStorage;