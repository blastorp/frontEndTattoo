import React from "react";
import '../estilos/Footer.css';

function Footer() {
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Información</h3>
            <ul>
              <li><a href="/about-us">Sobre nosotros</a></li>
              <li><a href="/privacy-policy">Política de privacidad</a></li>
              <li><a href="/terms">Términos y condiciones</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Redes sociales</h3>
            <ul className="social-icons">
              <li>
                <a
                  href="https://www.facebook.com/ColegioUniversitariodeCartago"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-facebook" style={{ fontSize: "24px" }}></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/cuccartago?igshid=YmMyMTA2M2Y%3D"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-instagram" style={{ fontSize: "24px" }}></i>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-twitter" style={{ fontSize: "24px" }}></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contacto</h3>
            <ul>
              <li>templeofink@gmail.com</li>
              <li>(506) 2555 2458</li>
              <li>Barrio el Molino, Cartago</li>
            </ul>
          </div>
        </div>
        <div className="footer-copyright">
          <p>&copy; 2024 Temple of Ink. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;