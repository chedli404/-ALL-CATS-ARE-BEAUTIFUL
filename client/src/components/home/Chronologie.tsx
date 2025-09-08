import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import TimelineItem from "@/components/ui/TimelineItem.tsx";
import { TIMELINE_DATA } from "@/lib/constants.ts";
import SmartEditable from "@/components/admin/SmartEditable";

const Chronologie = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: { 
      height: '100%',
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-anciens/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-technos/5 rounded-full blur-3xl"></div>
      
      <div 
        ref={ref}
        className="container mx-auto max-w-6xl"
      >
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={headerVariants}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
            <SmartEditable
              contentKey="home.chronologie.title"
              type="text"
              page="home"
              section="chronologie"
              defaultValue="Chronologie"
            />
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-body">
            <SmartEditable
              contentKey="home.chronologie.subtitle"
              type="text"
              page="home"
              section="chronologie"
              defaultValue="L'évolution du monde depuis la disparition des humains"
              multiline={true}
            />
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-technos to-anciens mx-auto mt-6"></div>
        </motion.div>

        <div className="relative mt-20 pb-20" style={{ minHeight: '700px' }}>
          {/* Timeline line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-technos via-mystique to-anciens"
            initial="hidden"
            animate={controls}
            variants={lineVariants}
            style={{ 
              top: 0,
              bottom: 0,
              boxShadow: '0 0 15px rgba(231, 130, 89, 0.3)'
            }}
          ></motion.div>

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
                delay={0.4 + (index * 0.2)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chronologie;