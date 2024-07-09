import Footer from "../components/admin/Footer";
import Sidebar from "../components/admin/Sidebar";

function AdminLayout({ children }) {
  return (
    <>
      <div id="admin">
        <Sidebar />
        <main>{ children }</main>
        <Footer />
      </div>
    </>
  )
}

export default AdminLayout;
