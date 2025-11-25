import MainTemplate from '../../templates/MainTemplate';

const PagoCorrectoPage = () => (
  <MainTemplate>
    <div className="text-center my-5">
      <h2 className="text-success fw-bold">¡Pago realizado con éxito!</h2>
      <p>Gracias por tu compra. Te enviaremos un correo con los detalles del pedido.</p>
      <img src="https://i.gyazo.com/3c14c06f3d536f269e8881ef46b6c157.png" alt="Pago correcto" className="img-fluid w-25" />
    </div>
  </MainTemplate>
);
export default PagoCorrectoPage;
