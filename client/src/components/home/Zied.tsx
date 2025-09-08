import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Zied() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="zied" className="py-24 bg-gray-800 relative" ref={ref}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#64afd6] rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-[#1C6E5F] rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-1 h-1 bg-[#64afd6] rounded-full animate-ping"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Floating image */}
          <motion.div 
            className="relative mb-8 z-20"
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                <div className="absolute -inset-2 rounded-full border-4 border-[#64afd6]/20" style={{animation: 'spin 3s linear infinite'}}></div>
                <div className="absolute -inset-4 rounded-full border border-[#64afd6]/20" style={{animation: 'spin 4s linear infinite'}}></div>
                <img 
                  src="/attached_assets/zied.png" 
                  alt="Zied"
                  className="w-128 h-128 lg:w-144 lg:h-144 object-center rounded-full   z-50 relative -m-24 -ml-4 -mt-4"
                />
              </div>
            </div>
          </motion.div>
          
          {/* Content overlay */}
          <motion.div 
            className="relative -mt-16 lg:-mt-32 ml-0 lg:ml-16 z-10"
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gray-900/90 backdrop-blur-sm p-8 lg:p-12 rounded-2xl border border-gray-700 max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                VISION <span className="text-[#64afd6]">ARTISTIQUE</span>
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Kabila a été créée afin d'opposer la nuance au vacarme, la création à la propagande. 
                  Dans un monde saturé par les récits de peur et de division, il nous fallait un espace libre.
                </p>
                <p className="text-lg leading-relaxed">
                  Un lieu où penser, imaginer, relier. Parce qu'un autre récit est possible... et nécessaire.
                </p>
              </div>
              
              {/* Floating quote */}
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-[#64afd6] text-white p-6 rounded-xl shadow-xl max-w-sm"
                variants={fadeIn}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: 0.4 }}
              >
                <blockquote className="italic text-sm mb-2">
                  "L'art ne reproduit pas le visible, il rend visible."
                </blockquote>
                <footer className="text-xs opacity-90">
                  — Paul Klee
                </footer>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Zied;
