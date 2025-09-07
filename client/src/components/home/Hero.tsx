import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import './Style.css';

const Hero = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-0" style={{ backgroundColor: "rgb(30, 30, 30)" }}>
      {/* Art vertical line - hide on mobile */}
      <div className="absolute hidden md:block left-[2%] lg:left-[90px] top-20 h-[200px] w-[2px] bg-gray-700">
        <h1 className="art">ART <br/> W <br/> 5ONAR</h1>
      </div>

      <div className="absolute hidden md:block left-[8%] lg:left-[90px] top-[500px] h-[200px] w-[2px] bg-gray-700"></div>
      
      <motion.div
        className="hero-container flex flex-col md:flex-row items-center max-w-7xl w-full md:space-x-12 lg:space-x-16 gap-6 md:gap-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Image - Shows on top for mobile, on right for larger screens */}
        <motion.div
          className="hero-video order-first md:order-last w-full md:w-1/2 mb-8 md:mb-0 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img
            src="/attached_assets/9abila 3d.png"
            alt="Hero"
            className="w-full max-w-sm md:max-w-full h-auto rounded-lg shadow-xl"
            style={{ maxHeight: "50vh", objectFit: "contain" }}
          />
        </motion.div>

        {/* Content - Shows below image on mobile, on left for larger screens */}
        <motion.div
          className="hero-content order-last md:order-first w-full md:w-1/2 pr-0 md:pr-12 text-center md:text-left md:pl-8 lg:pl-12"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed ">
          
Kabila est un média indépendant, né de l'élan d'un collectif de citoyens engagés à révéler les grands bouleversements de notre époque : dérèglement climatique, fractures sociales, conflits invisibles. Nous donnons voix à ce qui dérange, éclaire, éveille — avec la conviction que chaque récit peut devenir une force de transformation.

Dans un monde fragmenté par les clivages et les certitudes, Kabila se veut un espace de convergence et de création, où l'imaginaire rejoint le réel, où les sensibilités s'expriment librement, et où l'engagement prend forme au-delà des mots.

Nous tendons la main à celles et ceux qui imaginent, racontent et façonnent le monde autrement. Ensemble, ouvrons des espaces sensibles et puissants où les récits prennent corps, bousculent, relient. Rejoignez-nous pour faire de la création un acte d'engagement, et de chaque œuvre une passerelle vers un avenir plus juste et plus vivant.ration collective et de transformation sociétale.
          </p>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <a href="#world" className="text-white ">
          <ChevronDown className="h-8 w-8 mx-auto" />
        </a>
      </motion.div>
    </header>
  );
};

export default Hero;