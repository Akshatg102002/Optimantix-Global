
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Icon } from '../components/Icon';
import { ArrowUpRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const ServicesPage: React.FC = () => {
  const { services } = useData();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax Effect for Hero Background
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

    // Text Reveal Animation
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
    
    // Grid Stagger Animation - Fixed visibility
    // Using a fromTo ensures explicit start/end states to prevent sticking at opacity 0
    const cards = gsap.utils.toArray('.service-card');
    if (cards.length > 0) {
        gsap.fromTo(cards, 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 90%", // Trigger slightly earlier
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

  }, { scope: containerRef, dependencies: [services] });

  // Layout Logic: 3 Column Grid for 6 items
  // Index 0: Span 2 cols (Large)
  // Index 3: Span 2 cols (Large)
  // Index 5: Span 2 cols (Large)
  // This creates a pattern: [2][1] / [1][2] / [1][2]... wait
  
  // Let's match the visual expectation for 6 items
  // Row 1: [0-Wide] [1-Small]
  // Row 2: [2-Small] [3-Wide]
  // Row 3: [4-Small] [5-Wide]
  
  const getBentoClass = (index: number) => {
    // 0, 3, 5 are Wide
    if (index === 0 || index === 3 || index === 5) {
        return 'md:col-span-2';
    }
    return 'md:col-span-1';
  };

  const getServiceBackground = (slug: string) => {
      switch(slug) {
          case 'digital-marketing': return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'; 
          case 'marketplace-management': return 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1000';
          case 'development': return 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1000';
          case 'graphic-design': return 'https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=1000';
          case 'hosting': return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000';
          case 'communications': return 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=1000';
          default: return '';
      }
  };

  return (
    <div ref={containerRef} className="bg-light dark:bg-dark min-h-screen">
      <SEO 
        title="Our Services" 
        description="Explore our wide range of services including SEO, PPC, Marketplace Management, Web Development, and Branding."
      />
      
       {/* Parallax Hero Section */}
       <div ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 h-[120%] -top-[10%]">
           <img 
             ref={heroBgRef}
             src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000" 
             alt="Services Hero" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div ref={heroTextRef} className="container relative z-10 px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Our Expertise
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Comprehensive digital solutions tailored to drive growth and efficiency for your business.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-24">
        {services.length > 0 ? (
            <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                <div
                    key={service.id}
                    className={`service-card group relative bg-[#0e0e0e] rounded-3xl p-8 overflow-hidden hover:shadow-2xl transition-all duration-500 border border-white/5 hover:border-white/20 flex flex-col min-h-[420px] ${getBentoClass(index)}`}
                >
                    {/* Background Image with Gradient Overlay */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <img 
                            src={getServiceBackground(service.slug)} 
                            alt={service.title}
                            className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 filter grayscale" 
                        />
                        {/* Stronger gradient at bottom for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/80 via-[#0e0e0e]/95 to-[#0e0e0e]"></div>
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                        {/* Icon Box */}
                        <div className="w-14 h-14 bg-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 text-white border border-white/10 group-hover:bg-primary group-hover:border-primary transition-colors shadow-lg">
                            <Icon name={service.iconName} size={28} />
                        </div>
                        
                        <h3 className="text-3xl font-bold mb-4 text-white tracking-tight">{service.title}</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed max-w-lg text-lg font-light">{service.shortDescription}</p>
                        
                        {/* Sub Services Pills */}
                        <div className="flex-grow">
                            {service.subServices && service.subServices.length > 0 ? (
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {service.subServices.map(sub => (
                                        <Link 
                                            key={sub.id}
                                            to={`/services/${service.slug}/${sub.slug}`}
                                            className="text-xs font-bold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 border border-white/10 transition-all hover:border-primary/50 hover:text-white backdrop-blur-sm"
                                        >
                                            {sub.title}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex-grow"></div> 
                            )}
                        </div>

                        <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                            <Link 
                                to={`/services/${service.slug}`} 
                                className="inline-flex items-center text-white font-bold tracking-wide hover:text-primary transition group/link"
                            >
                                Explore Service <ArrowUpRight size={20} className="ml-2 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        ) : (
             <div className="text-center py-20 text-gray-500">
                Loading services...
             </div>
        )}
      </div>
    </div>
  );
};
