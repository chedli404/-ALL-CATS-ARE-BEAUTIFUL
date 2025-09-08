import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import TimelineItem from "@/components/ui/TimelineItem.tsx";
import { TIMELINE_DATA } from "@/lib/constants.ts";
import AnimatedHeading from "@/components/ui/AnimatedHeading.tsx";

const WorldSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      id="world" 
      className="py-24 relative overflow-hidden" 
      style={{ backgroundColor: 'rgb(25, 25, 25)' }} 
      ref={ref}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[rgba(28,110,95,0.1)] to-transparent opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-[rgba(227,169,71,0.1)] to-transparent opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Use AnimatedHeading component */}
          <AnimatedHeading 
            text="LE MONDE DE 2100" 
            color="#64afd6" 
            fontSize="text-4xl md:text-5xl"
          />
          
          <div className="grid md:grid-cols-2 gap-12 items-center border-b border-gray-700 pb-12">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.2 }}
              className="text-gray-200"
            >
              <p className="text-lg mb-6 leading-relaxed">
                Le monde n'est plus qu'un écho du passé. Les grandes cités s'effondrent, rongées par le temps et la nature. Les machines gisent inertes, vestiges d'une ère dont plus personne ne se souvient. L'humanité a disparu, sans laisser d'explication, sans témoins pour raconter son histoire.
              </p>
              
              <p className="text-lg mb-6 leading-relaxed">
                Mais tout n'a pas disparu. Les chats survivent. Ils errent dans ce monde abandonné, cherchant à comprendre ce qui fut. Ils chassent, s'adaptent, se méfient des ombres grandissantes des bâtiments mourants. 
              </p>
              
              <p className="text-lg leading-relaxed">
                Ils découvrent des traces, des symboles, des objets dont le sens leur échappe encore. Pourtant, quelque chose les attire, les pousse à aller plus loin. L'Homme a disparu, mais son empreinte est partout.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="transform transition-transform duration-300"
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl bg-black bg-opacity-30 p-2">
                <img 
                  src=" /attached_assets/IMG_0300.png"
                  alt="Post-apocalyptic landscape" 
                  className="w-full h-auto rounded-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30 pointer-events-none"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldSection;
