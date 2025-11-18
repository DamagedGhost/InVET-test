import Navbar from '../components/organisms/NavBar';
import Footer from '../components/organisms/Footer';

const MainTemplate = ({ children }) => (
  <>
    <header><Navbar /></header>
    <main>{children}</main>
    <Footer />
  </>
);
export default MainTemplate;