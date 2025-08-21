// src/hooks/useScrollToTop.js
import { useEffect } from 'react';

const useScrollToTop = (dependency = null) => {
  useEffect(() => {
    // Immediate scroll to top - no smooth behavior to avoid delay
    window.scrollTo(0, 0);
    
    // Also ensure document body is at top
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [dependency]);
};

export default useScrollToTop;