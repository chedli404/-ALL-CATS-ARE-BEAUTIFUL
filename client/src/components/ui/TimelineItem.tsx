import { motion } from "framer-motion";

interface TimelineItemProps {
  period: string;
  title: string;
  description: string;
  image: string;
  color: string;
  isLeft: boolean;
  delay?: number;
}

const TimelineItem = ({ 
  period,
  title,
  description,
  image,
  color,
  isLeft,
  delay = 0
}: TimelineItemProps) => {
  const itemVariants = {
    hidden: { opacity: 0, x: isLeft ? -20 : 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center mb-24">
      {isLeft ? (
        <>
          <motion.div 
            className="md:w-1/2 md:pr-12 text-right mb-6 md:mb-0"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="font-tech text-sm" style={{ color }}>
              {period}
            </span>
            <h4 className="font-display text-2xl mt-1 mb-3">{title}</h4>
            <p>{description}</p>
          </motion.div>
          
          <div className="timeline-dot w-8 h-8 rounded-full z-10 flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          
          <motion.div 
            className="md:w-1/2 md:pl-12 md:text-left"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: delay + 0.2 }}
          >
            <div className="bg-black/10 p-4 rounded-lg">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-40 object-cover rounded mb-2"
              />
              <span className="text-xs font-tech text-gray-700">Vestige de l'ère {title.toLowerCase()}</span>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div 
            className="md:w-1/2 md:pr-12 text-right mb-6 md:mb-0 order-1 md:order-1"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-black/10 p-4 rounded-lg">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-40 object-cover rounded mb-2"
              />
              <span className="text-xs font-tech text-gray-700">Vestige de l'ère {title.toLowerCase()}</span>
            </div>
          </motion.div>
          
          <div 
            className="timeline-dot w-8 h-8 rounded-full z-10 flex items-center justify-center order-2"
            style={{ backgroundColor: color }}
          >
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          
          <motion.div 
            className="md:w-1/2 md:pl-12 text-left order-3"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: delay + 0.2 }}
          >
            <span className="font-tech text-sm" style={{ color }}>
              {period}
            </span>
            <h4 className="font-display text-2xl mt-1 mb-3">{title}</h4>
            <p>{description}</p>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default TimelineItem;
