import { Link } from 'react-router-dom';
import { PortfolioContextProvider } from '../contexts/PortfolioContext';
import PortfolioHighlights from '../components/home/PortfolioHighlights';

function Home() {

  return (
    <div>
      <div id="home">
        <section id="banner">
          <div className="wrapper">
          {/* Banner left: text */}
            <div className="left">
              <h2>&lt;h1&gt;Hi! I am Jenny Chung&lt;/h1&gt;</h2>
              <p>A Full-stack Software developer.</p>
              <p>Welcome to my Portfolio!</p>
            </div>
            {/* Banner right: portrait */}
            <div className="right">
              <div className="dot_layer">
              <img src={ require('../assets/images/bg-dot.png')} alt="Dot Background Layer" width={729} height={302} />
              </div>
              <div className="portrait">
              <img src={ require('../assets/images/portrait.png') } alt="portrait" width={380} height={532} />
              </div>
            </div>
            </div>
            {/* Banner: waves animation */}
            <div className="waves-animation">
            <div className="waves-content">
            <svg width={'100%'} height={250} fill="none" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M0 67 C 273,183 822,-40 1920.00,106 V 359 H 0  V 67 Z">
                  <animate
                  repeatCount="indefinite"
                  attributeName="d"
                  dur="15s" attributeType="XML"
                  values="M0 77  C 473,283 822,-40 1920,116  V 359 H 0  V 67 Z; M0 77 C 473,-40 1222,283 1920,136  V 359 H 0 V 67 Z; M0 77 C 973,260 1722,-53 1920,120  V 359  H 0  V 67  Z; M0 77 C 473,283 822,-40 1920,116 V 359 H 0 V 67 Z">
                  </animate>
                </path>
            </svg>
            </div>
          </div>
        </section>

        {/* section 2: Portfolio Highlight */}
        <section id="work_desc">
          <div className="wrapper">
            <h2>&lt;h2&gt;Portfolio Highlight&lt;/h2&gt;</h2>

            <PortfolioContextProvider>
              <PortfolioHighlights />
            </PortfolioContextProvider>

            <div className="call_to_action">
              <div className="button">
              <Link to="/portfolio" title="Portfolio">Go to My Portfolio</Link>
              </div>
              <div className="indic_arr">
              <span>Check out <br />ALL my works :)</span>
              <img src={ require('../assets/images/arrow.png') } alt="arrow" width={131} height={80} />
              </div>
            </div>
          </div>
        </section>

        <section id="my_skills">
          <div className="wrapper">
            <h2>&lt;h2&gt;My Skills&lt;/h2&gt;</h2>
            {/* Left column */}
            <div className="left">

              <p>I am a web designer and full-stack developer. :)</p>

              {/* Skills Progress bar */}
              <div className="progress-bar-container">
                <div className="bar-content">
                  <h3>Design</h3>
                  <div className="progress-bar">
                    <span className="percentage design"></span>
                  </div>
                </div>

                <div className="bar-content">
                  <h3>Frontend</h3>
                  <div className="progress-bar">
                    <span className="percentage frontend"></span>
                  </div>
                </div>

                <div className="bar-content">
                  <h3>Backend</h3>
                  <div className="progress-bar">
                    <span className="percentage backend"></span>
                  </div>
                </div>

                <div className="bar-content">
                  <h3>Operation</h3>
                  <div className="progress-bar">
                    <span className="percentage launch"></span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right column */}
            <div className="right">

              {/* Text move animation */}
              <div className="languages">
                <div className="words word-1">
                  <span>H</span>
                  <span>T</span>
                  <span>M</span>
                  <span>L</span>
                  <span>5</span>
                </div>
                
                <div className="words word-2">
                  <span>J</span>
                  <span>A</span>
                  <span>V</span>
                  <span>A</span>
                  <span>S</span>
                  <span>C</span>
                  <span>R</span>
                  <span>I</span>
                  <span>P</span>
                  <span>T</span>
                </div>
                
                <div className="words word-3">
                  <span>C</span>
                  <span>S</span>
                  <span>S</span>
                  <span>3</span>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
      

    </div>
    
  );
}

export default Home;
