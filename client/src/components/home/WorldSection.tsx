import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import TimelineItem from "@/components/ui/TimelineItem";
import { TIMELINE_DATA } from "@/lib/constants";

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
    <section id="world" className="py-24" style={{ backgroundColor: 'rgb(35, 35, 35)' }} ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            className="font-display text-5xl mb-8 text-center text-[#64afd6]"
            variants={fadeIn}
            initial="hidden"
            animate={controls}
          >
            LE MONDE DE 2100
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.2 }}
            >
              <p className="text-lg mb-6">
                Le monde n'est plus qu'un écho du passé. Les grandes cités s'effondrent, rongées par le temps et la nature. Les machines gisent inertes, vestiges d'une ère dont plus personne ne se souvient. L'humanité a disparu, sans laisser d'explication, sans témoins pour raconter son histoire.
              </p>
              
              <p className="text-lg mb-6">
                Mais tout n'a pas disparu. Les chats survivent. Ils errent dans ce monde abandonné, cherchant à comprendre ce qui fut. Ils chassent, s'adaptent, se méfient des ombres grandissantes des bâtiments mourants. 
              </p>
              
              <p className="text-lg">
                Ils découvrent des traces, des symboles, des objets dont le sens leur échappe encore. Pourtant, quelque chose les attire, les pousse à aller plus loin. L'Homme a disparu, mais son empreinte est partout.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.4 }}
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img 
                  src=" /attached_assets/katous.png"
                  alt="Post-apocalyptic landscape" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                  <div className="p-6">
                    <span className="font-tech text-xs text-energy bg-black/60 px-2 py-1 rounded-sm">TERRE FRACTIONNÉE</span>
                    <h3 className="text-white font-display text-2xl mt-2">Un monde morcelé et mystérieux</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-24"
            variants={fadeIn}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.6 }}
          >
            <h3 className="font-display text-3xl mb-6 text-center text-[#64afd6]">CHRONOLOGIE DE L'HÉRITAGE</h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700"></div>
              
              {/* Timeline points */}
              <div className="relative z-10">
                {TIMELINE_DATA.map((item, index) => (
                  <TimelineItem 
                    key={index}
                    period={item.period}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    color={item.color}
                    isLeft={index % 2 === 0}
                    delay={0.8 + (index * 0.2)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorldSection;
