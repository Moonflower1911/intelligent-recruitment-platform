import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <body className="landing">
      <section className="hero-section">
        <header className="header">
          <nav className="navbar">
            <h2 className="logo">
              <a href="#">JobConnect</a>
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
            <ul className="links">
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
                <a href="#">Contactez-nous </a>
              </li>
            </ul>
          </nav>
        </header>
        <div className="hero">
          <h2>
            Bienvenue à JobConnect
          </h2>
          <p>
            Votre avenir commence ici! Choisissez votre rôle pour continuer.
          </p>
          <div className="buttons">
            <Link to="/authRecruiter/login" className="button">
              recruteur
            </Link>
            <Link to="/authJobSeeker/login" className="button">
              chercheur d'emploi{" "}
            </Link>
          </div>
        </div>
        <div className="img"></div>
      </section>
    </body>
  );
}

export default LandingPage;
