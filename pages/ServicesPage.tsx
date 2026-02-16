
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
  }, { scope: containerRef });

  const getBentoClass = (index: number) => {
    // Pattern: 2 cols on md, 3 on lg.
    // Index 0: col-span-2 (Large)
    // Index 3: col-span-2 (Large)
    // Others: col-span-1
    const isLarge = index === 0 || index === 3;
    return isLarge ? 'md:col-span-2' : 'md:col-span-1';
  };

  const getServiceImage = (slug: string) => {
      switch(slug) {
          case 'digital-marketing': return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'; // Dashboard
          case 'marketplace-management': return 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800'; // E-commerce
          case 'development': return 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800'; // Code
          case 'graphic-design': return 'https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=800'; // Design
          case 'hosting': return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'; // Servers
          case 'communications': return 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=800'; // Chat
          default: return 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800';
      }
  };

  return (
    <div ref={containerRef} className="bg-light dark:bg-dark min-h-screen">
      <SEO 
        title="Our Services" 
        description="Explore our wide range of services including SEO, PPC, Marketplace Management, Web Development, and Branding."
      />
      
       {/* Parallax Hero Section (Updated to match About Us) */}
       <div ref={heroRef} className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 h-[120%] -top-[10%]">
           <img 
             ref={heroBgRef}
             src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000" 
             alt="Services Hero" 
             className="w-full h-full object-cover filter brightness-50"
           />
           <div className="absolute inset-0 bg-black/40"></div>
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

      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group relative bg-[#0a0a0a] rounded-3xl p-8 overflow-hidden hover:shadow-2xl transition-all duration-500 border border-white/5 hover:border-white/20 flex flex-col justify-between ${getBentoClass(index)}`}
              >
                {/* Background Image Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={getServiceImage(service.slug)} 
                        alt={service.title}
                        className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
                </div>

                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 text-white border border-white/10 group-hover:bg-primary group-hover:border-primary transition-colors">
                        <Icon name={service.iconName} size={24} />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed max-w-md">{service.shortDescription}</p>
                </div>
                
                <div className="relative z-10 mt-auto">
                    {/* Sub Services Links */}
                    {service.subServices && service.subServices.length > 0 && (
                        <div className="mb-6 flex flex-wrap gap-2">
                            {service.subServices.slice(0, 4).map(sub => (
                                <Link 
                                    key={sub.id}
                                    to={`/services/${service.slug}/${sub.slug}`}
                                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 transition-colors"
                                >
                                    {sub.title}
                                </Link>
                            ))}
                        </div>
                    )}

                    <Link 
                        to={`/services/${service.slug}`} 
                        className="inline-flex items-center text-white font-semibold hover:text-primary transition group/link"
                    >
                        Explore Service <ArrowUpRight size={18} className="ml-2 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
