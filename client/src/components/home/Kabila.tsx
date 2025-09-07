import React from 'react'
import './Style.css'

const Kabila = () => {
    return (
        <section id="kabila" className="kabila-section">
            <div className="kabila-image-container">
                <img
                    src="/attached_assets/IMG_0292.png"
                    alt="kabila"
                    className="kabila-image"
                />
            </div>
            <div className="kabila-content">
                <p className="kabila-text">
                    kabila se distingue comme un média innovant, utilisant l'art digital pour sensibiliser et mobiliser autour des enjeux cruciaux de notre époque. nous croyons fermement que l'information et la créativité peuvent transformer la société en inspirant des changements réels et positifs. en mettant en avant des sujets souvent négligés, nous cherchons à créer une communauté engagée et à inciter à l'action pour un monde plus juste et durable.

                    nous invitons les ong, fondations et partenaires potentiels à rejoindre cette aventure. ensemble, nous pouvons renforcer l'impact de nos initiatives et travailler pour un avenir meilleur. n'hésitez pas à nous contacter pour discuter de collaborations et découvrir comment nous pouvons, ensemble, faire la différence.
                </p>
                <button className="kabila-button">Contact</button>
            </div>
        </section>
    )
}

export default Kabila