import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedHeadingProps {
  text: string;
  color?: string;
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
  showDivider?: boolean;
  fontSize?: string;
}

const AnimatedHeading = ({
  text,
  color = '#64afd6',
  className = '',
  textAlign = 'center',
  showDivider = true,
  fontSize = 'text-3xl sm:text-4xl md:text-5xl'
}: AnimatedHeadingProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: false, amount: 0.3 });
  
  // Split the text into individual letters for animation
  const titleLetters = text.split('');
  
  return (
    <div className="overflow-hidden">
      <div className={`flex ${textAlign === 'center' ? 'justify-center' : textAlign === 'right' ? 'justify-end' : 'justify-start'} mb-6 overflow-hidden`}>
        <motion.h2 
          ref={titleRef}
          className={`flex items-center font-bold tracking-wide ${fontSize} ${className}`}
          style={{ 
            fontFamily: '"Nova Flat", system-ui',
          }}
        >
          {titleLetters.map((letter, index) => (
            <motion.span 
              key={index}
              className="inline-block"
              style={{ color: color }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h2>
      </div>

      {showDivider && (
        <motion.div 
          className={`relative flex ${textAlign === 'center' ? 'justify-center' : textAlign === 'right' ? 'justify-end' : 'justify-start'} mb-12`}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.8, delay: titleLetters.length * 0.05 + 0.2 }}
        >
          <div className="h-1 w-40 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"></div>
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedHeading;