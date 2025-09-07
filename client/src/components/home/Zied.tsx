import React, { useEffect, useState } from 'react';
import './Style.css';

function Zied() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    const section = document.querySelector('#zied');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="zied" className="zied-section">
      <div className="zied-wrapper">
        <div className="zied-image-container">
          <img 
            src="/attached_assets/zied.png" 
            alt="zied"
            className={`zied-image ${isVisible ? 'slide-in' : ''}`}
          />
        </div>
        <div className="zied-text-container">
          <div className="zied-text-wrapper">
            <p className="zied-paragraph">
              Kabila a été crée afin opposer la nuance au vacarme, la création à la propagande. 
              Dans un monde saturé par les récits de peur et de division, souvent dictés par l'extrême droite ou des intérêts privés, il nous fallait un espace libre.
              Un lieu où penser, imaginer, relier. Parce qu'un autre récit est possible .. et nécessaire.
            </p>
            <p className="zied-quote">
              "L'art ne reproduit pas le visible, il rend visible."
              — Paul Klee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Zied;
