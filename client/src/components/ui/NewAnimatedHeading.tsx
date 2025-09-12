import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface NewAnimatedHeadingProps {
  text: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  accent?: 'primary' | 'secondary' | 'tertiary' | 'white';
  className?: string;
  glowEffect?: boolean;
  delay?: number;
}

const NewAnimatedHeading = ({
  text,
  subtitle,
  align = 'center',
  size = 'lg',
  accent = 'primary',
  className = '',
  glowEffect = true,
  delay = 0
}: NewAnimatedHeadingProps) => {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: false, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Split text into words and then letters for animation
  const words = text.split(' ');
  
  // Determine text color
  const getTextColor = () => {
    switch (accent) {
      case 'primary': return 'var(--primary)';
      case 'secondary': return 'var(--secondary)';
      case 'tertiary': return 'var(--tertiary)';
      case 'white': return 'var(--text-light)';
      default: return 'var(--primary)';
    }
  };
  
  // Determine heading size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-xl md:text-2xl';
      case 'md': return 'text-2xl md:text-3xl lg:text-4xl';
      case 'lg': return 'text-3xl md:text-4xl lg:text-5xl';
      case 'xl': return 'text-4xl md:text-5xl lg:text-6xl';
      default: return 'text-3xl md:text-4xl lg:text-5xl';
    }
  };
  
  // Determine alignment classes
  const getAlignmentClasses = () => {
    switch (align) {
      case 'left': return 'text-left items-start';
      case 'center': return 'text-center items-center';
      case 'right': return 'text-right items-end';
      default: return 'text-center items-center';
    }
  };
  
  return (
    <div 
      ref={headingRef} 
      className={`flex flex-col ${getAlignmentClasses()} mb-8 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden relative">
        <h2 
          className={`heading-display ${getSizeClasses()} tracking-wider mb-3 relative`}
          style={{ color: getTextColor() }}
        >
          <div className="flex flex-wrap justify-center">
            {words.map((word, wordIndex) => (
              <div key={wordIndex} className="flex mr-2 mb-1">
                {word.split('').map((letter, letterIndex) => (
                  <motion.span 
                    key={letterIndex}
                    className="inline-block" 
                    initial={{ y: 40, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: delay + wordIndex * 0.05 + letterIndex * 0.03,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>
        </h2>
        
        {/* Animated glow effect */}
        {glowEffect && (
          <motion.div 
            className="absolute bottom-0 h-[3px] rounded-full bg-gradient-to-r"
            style={{ 
              left: '10%', 
              right: '10%',
              backgroundImage: `linear-gradient(to right, transparent, ${getTextColor()}, transparent)`,
              opacity: isHovered ? 0.8 : 0.5
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: isHovered ? 0.8 : 0.5 } : { scaleX: 0, opacity: 0 }}
            transition={{ 
              delay: delay + words.reduce((acc, word) => acc + word.length, 0) * 0.03,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
        )}
      </div>

      {/* Optional subtitle */}
      {subtitle && (
        <motion.p 
          className="text-base md:text-lg text-text-dim max-w-2xl body-text"
          style={{ 
            opacity: 0.8,
            color: 'var(--text-dim)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            delay: delay + words.reduce((acc, word) => acc + word.length, 0) * 0.03 + 0.2,
            duration: 0.6,
            ease: 'easeOut'
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default NewAnimatedHeading;