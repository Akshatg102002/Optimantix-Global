import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCanonical } from '../hooks/useCanonical';

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useCanonical();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};