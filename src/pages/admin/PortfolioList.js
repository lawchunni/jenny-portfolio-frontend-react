import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PortfolioContext } from "../../contexts/PortfolioContext";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";

const PortfolioList = () => {
  const {data, loading, error} = useContext(PortfolioContext);
  const [displayData, setDisplayData] = useState(null);

  useEffect(() => {
    setDisplayData(data)
  }, [setDisplayData, data]);

  if (loading) return (<><Loading /></>);

  if (error) return (<><Error /></>);

  return (
    <>
      <section id="admin_products" className="section_white">
        <div className="wrapper">
          <div className="content">

              <h1>Portfolio List</h1>

              <div className="action_btn">
                <Link className="add_btn" to="/admin/portfolio-create">Add Item</Link>
              </div>

              <div className="view_list">
                <div className="row header">
                  <div className="col col-1">ID</div>
                  <div className="col col-2">Title</div>
                  <div className="col col-2">Thumbnail</div>
                  <div className="col col-2">Tags</div>
                  <div className="col col-2">Highlight</div>
                  <div className="col col-2">Deleted</div>
                  <div className="col col-1"></div>
                </div>
                  {
                    displayData.map((item, index) => {
                      return(
                        <div className={`row ${item?.deleted ? 'deleted' : ''}`} key={index}>
                          <div className="col col-1">{item?._id}</div>
                          <div className="col col-2">{item?.title}</div>
                          <div className="col col-2">
                            <img src={'http://127.0.0.1:4000' + item?.thumbnail} alt={item?.title} width={80}/>
                          </div>
                          <div className="col col-2">
                            {
                              item?.tags
                            }
                          </div>
                          <div className="col col-2">{item?.highlight ? 'Yes' : 'No'}</div>
                          <div className="col col-2">{item?.deleted ? 'Yes' : 'No'}</div>
                          <div className="col col-1 list_btn">
                            <Link to={`/admin/portfolio-edit/${item?._id}`}>Edit</Link>

                            <a href="/" className="btn delete_btn" type="submit" name="delete" value="delete">delete</a>
                          </div>
                        </div>
                      )
                    })
                  }
              </div>
              
          </div>
        </div>
      </section>
    </>
  )
}

export default PortfolioList;
