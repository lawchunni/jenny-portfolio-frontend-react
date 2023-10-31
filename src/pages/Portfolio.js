import { Link } from 'react-router-dom';

function Portfolio() {

  let portfolio = [
    {
      id: 1,
      title: 'Work 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adip.',
      img: 'UX-Mockup.png',
      tech: 'javascript|CSS|PHP|Git|Cloud'
    },
    {
      id: 2,
      title: 'Work 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adip.',
      img: 'portfolio-01-thumbnail.jpg',
      tech: 'javascript|CSS|PHP|Git|Cloud'
    },
    {
      id: 3,
      title: 'Work 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adip.',
      img: 'portfolio-01-thumbnail.jpg',
      tech: 'javascript|CSS|PHP|Git|Cloud'
    },
    {
      id: 4,
      title: 'Work 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adip.',
      img: 'Launch-Website.png',
      tech: 'javascript|CSS|PHP|Git|Cloud'
    }
  ]

  return (
    <>
      <section id="portfolio">
        <div className="wrapper">
          <h1>Portfolio</h1>

          <div className="content">
            {
              portfolio.map((item, idx) => (
                <div key={idx} className="item">
                  <h2>{ item.title }</h2>
                  <div className="thumbnail" style={{backgroundImage: `url(${require('../assets/images/' + item.img)})` }}>
                    <Link to={`/portfolio-details/${item.id}`}></Link>
                    <span className="view">View</span>
                    <span className="cover"></span>
                    
                  </div>
                  <h3>Desc:</h3>
                  <p className="desc">{ item.description }</p>
                  <div className="tag">
                    {
                      item.tech.split('|').map((tagItem, tagIdx) => (
                        <span key={tagIdx}>{tagItem}</span>
                      ))
                    }
                  </div>
                </div>
              ))
            }
              
          </div>
        </div>
        
      </section>
    </>
  )
}

export default Portfolio;
