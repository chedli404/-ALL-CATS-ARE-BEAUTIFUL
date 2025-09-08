import { useEffect, useState, useRef, TouchEvent } from 'react';
import { Link } from 'wouter';
import { Character } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './CardStyles.css';

interface RotatingCardsProps {
  characters: Character[];
  filter: string;
}

const getTribeClass = (tribe: string) => {
  switch(tribe) {
    case 'Nomades':
      return 'nomades';
    case 'Anciens':
      return 'traditionnalistes';
    case 'Technos':
      return 'technologistes';
    case 'Écologistes':
      return 'ecologistes';
    case 'Mystiques':
      return 'mystiques';
    case 'Électriques':
      return 'electriques';
    default:
      return 'nomades';
  }
};

const RotatingCards = ({ characters, filter }: RotatingCardsProps) => {
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [rotateY, setRotateY] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  
  // For touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    if (!characters || characters.length === 0) {
      setFilteredCharacters([]);
      return;
    }
    
    if (filter === 'all') {
      setFilteredCharacters(characters);
    } else {
      setFilteredCharacters(characters.filter(char => char.tribe === filter));
    }
  }, [characters, filter]);

  // Handle manual rotation with left/right controls
  const rotateLeft = () => {
    setIsPaused(true);
    setRotateY(prev => prev - 36); // Rotate by 36 degrees (360/10 characters)
  };

  const rotateRight = () => {
    setIsPaused(true);
    setRotateY(prev => prev + 36); // Rotate by 36 degrees (360/10 characters)
  };

  // Reset rotation when filter changes
  useEffect(() => {
    setRotateY(0);
  }, [filter]);

  // Touch event handlers for mobile swiping
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      rotateLeft(); // Left swipe rotates left
    } else if (isRightSwipe) {
      rotateRight(); // Right swipe rotates right
    }
    
    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="wrapper-container">
      <div 
        ref={wrapperRef}
        className="wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setRotateY(0); // Reset rotation when resuming animation
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={isPaused ? { 
          '--animation-play-state': 'paused' 
        } as React.CSSProperties : {}}
      >
        <div 
          ref={innerRef}
          className={`inner ${isPaused ? 'no-animation' : ''}`} 
          style={{ 
            '--quantity': filteredCharacters.length,
            '--rotate-y': `${rotateY}deg`
          } as React.CSSProperties}
        >
          {filteredCharacters.map((character, index) => (
            <Link 
              key={character.id} 
              href={`/characters/${character.id}`}
              className={`card ${getTribeClass(character.tribe)}`} 
              style={{ '--index': index } as React.CSSProperties}
            >
              <div className="card-content">
                <div 
                  className="img"
                  style={{ 
                    backgroundImage: `url(${character.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="character-name">{character.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Navigation arrows - also kept for non-touch devices */}
      <div className="card-navigation">
        <button 
          className="nav-btn left-btn" 
          onClick={rotateLeft}
          aria-label="Scroll left"
        >
          <ChevronLeft size={30} />
        </button>
        <button 
          className="nav-btn right-btn" 
          onClick={rotateRight}
          aria-label="Scroll right"
        >
          <ChevronRight size={30} />
        </button>
      </div>
      
      {/* Swipe instruction for mobile */}
      <div className="swipe-instruction">
        <p>Swipe to browse characters</p>
      </div>
    </div>
  );
};

export default RotatingCards;