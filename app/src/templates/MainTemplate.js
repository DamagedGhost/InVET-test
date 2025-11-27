import Navbar from '../components/organisms/NavBar';
import Footer from '../components/organisms/Footer';

const MainTemplate = ({ children }) => (
  <>
    <Navbar />
    {/* El main tomará el espacio restante gracias al CSS flex:1 en App.css */}
    {children}
    <Footer />
  </>
);

export default MainTemplate;