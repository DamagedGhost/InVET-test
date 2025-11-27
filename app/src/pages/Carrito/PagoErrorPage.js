import MainTemplate from '../../templates/MainTemplate';

const PagoErrorPage = () => (
  <MainTemplate>
    <div className="text-center my-5">
      <h2 className="text-danger fw-bold">¡Error al procesar el pago!</h2>
      <p>Ocurrió un problema con tu transacción. Inténtalo nuevamente o contacta soporte.</p>
      <img src="https://i.gyazo.com/5593f3bbe109c38ebf07c16dd25dc4c4.gif" alt="Pago fallido" className="img-fluid w-25" />
    </div>
  </MainTemplate>
);
export default PagoErrorPage;
