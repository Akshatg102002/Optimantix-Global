import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useCanonical = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const baseUrl = 'https://optimantix.com';
    const canonicalUrl = `${baseUrl}${pathname}`;

    let canonicalElement = document.querySelector('link[rel="canonical"]');

    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.rel = 'canonical';
      document.head.appendChild(canonicalElement);
    }

    canonicalElement.setAttribute('href', canonicalUrl);
  }, [pathname]);
};
