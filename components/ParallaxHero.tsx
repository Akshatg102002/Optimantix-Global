
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxHeroProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  imageAltText?: string;
  height?: string;
  overlayOpacity?: number;
}

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  title,
  subtitle,
  imageUrl,
  imageAltText,
  height = "60vh",
  overlayOpacity = 0.6
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (heroBgRef.current && heroRef.current) {
      gsap.to(heroBgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    if (heroTextRef.current) {
        gsap.from(heroTextRef.current.children, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.2
        });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
       <div ref={heroRef} className={`relative flex items-center justify-center overflow-hidden`} style={{ height }}>
        <div className="absolute inset-0 z-0 h-[120%] -top-[10%]">
           <img
             ref={heroBgRef}
             src={imageUrl}
             alt={imageAltText || title}
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }}></div>
        </div>

        <div ref={heroTextRef} className="container relative z-10 px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
