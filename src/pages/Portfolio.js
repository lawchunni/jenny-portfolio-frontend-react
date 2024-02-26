import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Portfolio() {

  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const res = await fetch('http://127.0.0.1:4000/portfolio');

      if (!res.ok) {
        const msg = `An error occurred: ${res.statusText}`;
        window.alert(msg);
        return;
      }

      const records = await res.json();
      setRecords(records);
    }

    getRecords();
    return;

  }, [records.length]);

  function recordList() {
    return records.map((record, index) => {
      return (
        <div key={index} className="item">
          <h2>{ record.title }</h2>
          <div className="thumbnail" style={{backgroundImage: `url(${require('../assets/images/' + record.thumbnail)})` }}>
            <Link to={`/portfolio-details/${record._id}`}></Link>
            <span className="view">View</span>
            <span className="cover"></span>
            
          </div>
          <h3>Desc:</h3>
          <p className="desc">{ record.desc_short }</p>
          <div className="tag">
            {
              record.tags.map((tagItem, tagIdx) => (
                <span key={tagIdx}>{tagItem}</span>
              ))
            }
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <section id="portfolio">
        <div className="wrapper">
          <h1>Portfolio</h1>

          <div className="content">
            { recordList()}
          </div>
        </div>
        
      </section>
    </>
  )
}

export default Portfolio;
