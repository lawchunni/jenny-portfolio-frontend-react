import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

function CommonLayout({ children }) {
  return (
    <>
      <Header />
      <main>{ children }</main>
      <Footer />
    </>
  )
}

export default CommonLayout;
