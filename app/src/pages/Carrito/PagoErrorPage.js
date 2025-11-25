import MainTemplate from '../../templates/MainTemplate';

const PagoErrorPage = () => (
  <MainTemplate>
    <div className="text-center my-5">
      <h2 className="text-danger fw-bold">¡Error al procesar el pago!</h2>
      <p>Ocurrió un problema con tu transacción. Inténtalo nuevamente o contacta soporte.</p>
      <img src="https://i.gyazo.com/98b6a18b16e882e7890b716f3cfe41dc.png" alt="Pago fallido" className="img-fluid w-25" />
    </div>
  </MainTemplate>
);
export default PagoErrorPage;
