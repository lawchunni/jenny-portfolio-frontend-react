import PortfolioForm from "../../components/admin/PortfolioForm";

const PortfolioCreate = () => {

  return (
    <>
      <section id="admin_products_add">
        <div className="wrapper">
          <div className="content">
              
            <h1>New Portfolio Item</h1>
            
            <PortfolioForm type="create" />
              
          </div>
        </div>
      </section>
    </>
  )
}

export default PortfolioCreate;
