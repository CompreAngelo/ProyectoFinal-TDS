import React, { useEffect } from 'react';

const PaypalButton = () => {
  useEffect(() => {
    if (window.paypal) { // Verifica si el SDK de PayPal ya está cargado
      window.paypal.Buttons({
        style: {
          layout: 'vertical', // or 'horizontal'
          color: 'gold', // or 'blue', 'silver', 'black', 'white'
          shape: 'rect', // or 'pill'
          label: 'pay', // or 'checkout', 'buynow', 'paypal'
          widh: 40, // altura en píxeles
        },
        createOrder: function(data, actions) {
          // Configuración de la orden
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.01' // Define el monto de la transacción
              }
            }]
          });
        },
        onApprove: function(data, actions) {
          // Acción al aprobar el pago
          return actions.order.capture().then(function(details) {
            // P.ej., muestra un mensaje de éxito
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        }
      }).render('#paypal-button-container');
    }
  }, []);

  return <div id="paypal-button-container"></div>;
};

export default PaypalButton;
