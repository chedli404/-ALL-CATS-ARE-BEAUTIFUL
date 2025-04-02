import { Link } from "wouter";
import { Facebook, Twitter, Instagram, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main-content">
          <div className="footer-logo-section">
            <div className="footer-logo-container">
              <div className="footer-logo">
                <span className="footer-logo-text">AC</span>
              </div>
              <h3 className="footer-title">ACAB</h3>
            </div>
            <p className="footer-tagline">All Cats Are Beautiful - L'Héritage</p>
          </div>
          
          <div className="footer-links-grid">
            <div className="footer-links-column">
              <h4 className="footer-column-title">Univers</h4>
              <ul className="footer-links-list">
                <li><Link href="/world" className="footer-link">Le Monde</Link></li>
                <li><Link href="/tribes" className="footer-link">Tribus</Link></li>
                <li><Link href="/characters" className="footer-link">Personnages</Link></li>
                <li><Link href="/map" className="footer-link">Carte</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4 className="footer-column-title">Créations</h4>
              <ul className="footer-links-list">
                <li><Link href="/legends" className="footer-link">BD & Animés</Link></li>
                <li><Link href="/game" className="footer-link">Jeu de Société</Link></li>
                <li><Link href="/artifacts" className="footer-link">Illustrations</Link></li>
                <li><Link href="#" className="footer-link">Boutique</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4 className="footer-column-title">Projet</h4>
              <ul className="footer-links-list">
                <li><Link href="#" className="footer-link">À Propos</Link></li>
                <li><Link href="#" className="footer-link">Équipe</Link></li>
                <li><Link href="#" className="footer-link">Blog</Link></li>
                <li><Link href="#" className="footer-link">Contact</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4 className="footer-column-title">Suivez-nous</h4>
              <div className="social-icons-container">
                <a href="#" className="social-icon-link">
                  <Instagram className="social-icon" />
                </a>
                <a href="#" className="social-icon-link">
                  <Twitter className="social-icon" />
                </a>
                <a href="#" className="social-icon-link">
                  <Facebook className="social-icon" />
                </a>
                <a href="#" className="social-icon-link">
                  <MessageSquare className="social-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-copyright-section">
          <p className="copyright-text">
            © 2023 ACAB - All Cats Are Beautiful. Tous droits réservés. <br />
            Projet par Zied Belaifa, Zied Ouerda & Sarra Bdiri.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
