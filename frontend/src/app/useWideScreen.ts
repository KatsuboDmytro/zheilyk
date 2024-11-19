import { useState, useEffect } from 'react';

const useWideScreen = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1199);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1199);
      setIsBurgerOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isWideScreen, isBurgerOpen, setIsBurgerOpen };
};

export default useWideScreen;
