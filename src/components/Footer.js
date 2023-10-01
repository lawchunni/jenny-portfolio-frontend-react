import linkedin from '../assets/images/icon-linkedin.svg';
import whatsapp from '../assets/images/icon-whatsapp.svg';

function Footer() {

  const date = new Date();
  const getYear = date.getFullYear();

  return (
    <>
      <footer>
        <div className="wrapper">
          <div className="left">
            <p>Copyright &copy; { getYear } JennyPortfolio. All right reserved.</p>
          </div>
          <div className="right icon">
            <div className="social_icon">
              <a href="https://www.linkedin.com/in/jenny-puichingchung/" target="_blank" rel="noreferrer" title="Linkedin">
                <img src={ linkedin } alt="linkedin icon" width={35} height={35} />
              </a>
            </div>
            <div className="social_icon">
              <a href="https://api.whatsapp.com/send?phone=12049968808" target="_blank" rel="noreferrer" title="Whatsapp">
                <img src={ whatsapp } alt="whatsapp icon" width={35} height={35} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;
