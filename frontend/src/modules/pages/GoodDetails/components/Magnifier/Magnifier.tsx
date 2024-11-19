import React, { useState, useRef, MouseEvent } from 'react';

interface MagnifierProps {
  img: string;
  openScaleModal?: () => void;
}

const Magnifier: React.FC<MagnifierProps> = ({ img, openScaleModal }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [magnifierStyle, setMagnifierStyle] = useState<React.CSSProperties>({
    display: 'none',
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
  
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    const magnifierSize = 200;
    const backgroundSize = '400% 400%';
  
    const backgroundPositionX = ((x / rect.width) * 100).toFixed(2);
    const backgroundPositionY = ((y / rect.height) * 100).toFixed(2);
  
    setMagnifierStyle({
      left: `${Math.max(0, Math.min(rect.width - magnifierSize, x - magnifierSize / 2))}px`,
      top: `${Math.max(0, Math.min(rect.height - magnifierSize, y - magnifierSize / 2))}px`,
      width: `${magnifierSize}px`,
      height: `${magnifierSize}px`,
      backgroundImage: `url(${img})`,
      backgroundSize: backgroundSize,
      backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
      display: 'block',
    });
  };
  

  const handleMouseLeave = () => {
    setMagnifierStyle({ display: 'none' });
  };

  return (
    <div
      ref={containerRef}
      className="zoom"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <img
        src ={img}
        alt='every-day'
        className='details__images--main'
        onClick={openScaleModal}
        style={{ width: '100%', height: 'auto' }}
      />
      <div
        className="magnifier"
        style={{
          ...magnifierStyle,
          position: 'absolute',
          borderRadius: '50%',
          pointerEvents: 'none',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
      />
    </div>
  );
};

export default Magnifier;