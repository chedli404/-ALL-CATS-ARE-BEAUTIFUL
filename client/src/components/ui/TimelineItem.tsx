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
  const contentVariants = {
    hidden: { opacity: 0, x: isLeft ? -30 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, delay: delay + 0.2, ease: "easeOut" }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        delay: delay + 0.1,
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center mb-32 relative px-4">
      {/* Mobile view (stacked layout) */}
      <div className="md:hidden w-full flex flex-col items-center mb-12">
        <motion.div
          className="w-16 h-16 rounded-full mb-6 flex items-center justify-center shadow-lg z-10"
          variants={dotVariants}
          initial="hidden"
          animate="visible"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 20px ${color}50`
          }}
        >
          <div className="w-6 h-6 bg-white rounded-full"></div>
        </motion.div>

        <motion.div 
          className="text-center mb-6 w-full px-2"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <span 
            className="font-tech text-lg inline-block px-4 py-1 rounded-full mb-3" 
            style={{ backgroundColor: `${color}30`, color }}
          >
            {period}
          </span>
          <h4 className="font-display text-2xl md:text-3xl mb-3 text-white">{title}</h4>
          <p className="text-gray-300 font-body">{description}</p>
        </motion.div>

        <motion.div
          className="w-full"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="overflow-hidden rounded-lg border border-gray-700 shadow-lg bg-gray-800/30 backdrop-blur-sm">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-3">
              <span className="text-xs font-tech text-gray-400">Vestige de l'ère {title.toLowerCase()}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Desktop view (side-by-side layout) */}
      <div className="hidden md:flex w-full">
        {isLeft ? (
          <>
            <motion.div 
              className="w-[45%] pr-12 text-right"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <span 
                className="font-tech text-lg inline-block px-4 py-1 rounded-full mb-3" 
                style={{ backgroundColor: `${color}30`, color }}
              >
                {period}
              </span>
              <h4 className="font-display text-2xl md:text-3xl mb-3 text-white">{title}</h4>
              <p className="text-gray-300 font-body">{description}</p>
            </motion.div>
            
            <div className="w-[10%] flex justify-center relative">
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg absolute"
                variants={dotVariants}
                initial="hidden"
                animate="visible"
                style={{ 
                  backgroundColor: color,
                  boxShadow: `0 0 20px ${color}50`
                }}
              >
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </motion.div>
            </div>
            
            <motion.div 
              className="w-[45%] pl-12"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="overflow-hidden rounded-lg border border-gray-700 shadow-lg bg-gray-800/30 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-64 object-cover" 
                />
                <div className="p-3">
                  <span className="text-sm font-tech text-gray-400">Vestige de l'ère {title.toLowerCase()}</span>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div 
              className="w-[45%] pr-12 text-right"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="overflow-hidden rounded-lg border border-gray-700 shadow-lg bg-gray-800/30 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-64 object-cover" 
                />
                <div className="p-3">
                  <span className="text-sm font-tech text-gray-400">Vestige de l'ère {title.toLowerCase()}</span>
                </div>
              </div>
            </motion.div>
            
            <div className="w-[10%] flex justify-center relative">
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg absolute"
                variants={dotVariants}
                initial="hidden"
                animate="visible"
                style={{ 
                  backgroundColor: color,
                  boxShadow: `0 0 20px ${color}50`
                }}
              >
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </motion.div>
            </div>
            
            <motion.div 
              className="w-[45%] pl-12 text-left"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <span 
                className="font-tech text-lg inline-block px-4 py-1 rounded-full mb-3" 
                style={{ backgroundColor: `${color}30`, color }}
              >
                {period}
              </span>
              <h4 className="font-display text-2xl md:text-3xl mb-3 text-white">{title}</h4>
              <p className="text-gray-300 font-body">{description}</p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;