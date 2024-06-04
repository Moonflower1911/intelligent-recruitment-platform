import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <body className="landing1">
      <section className="hero-section1">
        <header className="header1">
          <nav className="navbar1">
            <h2 className="logo1">
              <div className="img2"></div>
            </h2>
            <input type="checkbox" id="menu-toggle" />
            <label htmlFor="menu-toggle" id="hamburger-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </label>
            <ul className="links1">
              <li>
                <a href="#">Accueil</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contactez-nous</a>
              </li>
            </ul>
          </nav>
        </header>
        <div className="hero1">
          <h2>Bienvenue à JobConnect</h2>
          <p>Votre avenir commence ici! Choisissez votre rôle pour continuer.</p>
          <div className="buttons1">
            <Link to="/authRecruiter/login" className="button1">
              recruteur
            </Link>
            <Link to="/authJobSeeker/login" className="button1">
              chercheur d'emploi
            </Link>
          </div>
        </div>
        <div className="img1"></div>
      </section>
      <footer className="footer-distributed">
        <div className="footer-left">
          <h3>Job<span>Connect</span></h3>
          <p className="footer-links">
            <a href="#" className="link-1">Accueil</a>
            <a href="#">Blog</a>
            <a href="#">Tarifs</a>
            <a href="#">À propos</a>
            <a href="#">FAQ</a>
            <a href="#">Contact</a>
          </p>
          <p className="footer-company-name">JobConnect © 2024</p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>Ensias, Rabat</p>
          </div>
          <div>
            <i className="fa fa-phone"></i>
            <p>+212612345678</p>
          </div>
          <div>
            <i className="fa fa-envelope"></i>
            <p><a href="mailto:support@company.com">jobconnect24@gmail.com</a></p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>À propos de l'entreprise</span>
            JobConnect est dédié à la mise en relation des recruteurs et des chercheurs d'emploi. Nous fournissons une plateforme qui simplifie et rend efficace le processus de recrutement.
          </p>
          <div className="footer-icons">
            <a href="#" className="facebook"></a>
            <a href="#" className="twitter"></a>
            <a href="#" className="linkedin"></a>
            <a href="#" className="github"></a>
          </div>
        </div>
      </footer>
    </body>
  );
}

export default LandingPage;
