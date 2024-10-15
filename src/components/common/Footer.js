import linkedin from '../../assets/images/icon-linkedin.svg';

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
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;
