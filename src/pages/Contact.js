import { useLayoutEffect, useRef } from 'react';

function Contact() {

  return (
    <>
      <section id="contact">
        <div className="wrapper">
          <div className="left">
            <h1>Contact Me</h1>
            <div className="portrait">
              <img src={ require('../assets/images/portrait.png') } alt="Portrait" width={406} height={568} />
            </div>
          </div>

        <div className="right">
            
          <form action="#"
                method="post"
                id="contact_form"
                autoComplete="off"
                >
            <p> 
              <input type="text"
                      name="first_name"
                      id="first_name"
                      placeholder="First Name"
                      color="#fff"
                      required />
            </p>
                
            <p>
              <input type="text"
                      name="last_name"
                      id="last_name"
                      placeholder="Last Name"
                      required />
            </p>
                
            <p>
              <input type="email" 
                      name="email_address"
                      id="email_address"
                      placeholder="Email Address"
                      required />
            </p>
                
            <p>
              <input type="tel" 
                      name="phone_number"
                      id="phone_number"
                      placeholder="Phone Number (optional)"/>
            </p>

            <p>
              <textarea id="message"
                      name="message"
                      cols="35"
                      rows="5"
                      placeholder="Leave me a message (optional)"></textarea>
            </p>
                
            <div>
                <button className="submit_button">Send</button>
            </div>
          </form>
        </div>
        
        </div>
      </section>
    </>
  )
}

export default Contact;