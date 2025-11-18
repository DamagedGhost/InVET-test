import NavbarVerticalAdmin from "../components/organisms/NavbarVerticalAdmin";

const AdminTemplate = ({ children }) => (
  <>
    <header><NavbarVerticalAdmin /></header>
    <main>{children}</main>
  </>
);
export default AdminTemplate; 