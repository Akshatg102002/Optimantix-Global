import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Icon } from '../components/Icon';
import { ArrowUpRight, BarChart3, ShieldCheck, Zap, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ParallaxHero } from '../components/ParallaxHero';

gsap.registerPlugin(ScrollTrigger);

export const ServicesPage: React.FC = () => {
    const { services } = useData();
    const containerRef = useRef<HTMLDivElement>(null);
    const featureRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Elegant Staggered Grid Animation
        const cards = gsap.utils.toArray('.service-card');
        if (cards.length > 0) {
            gsap.fromTo(cards,
                { y: 80, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: ".services-grid",
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Features Section Animation
        const features = gsap.utils.toArray('.feature-item');
        if (features.length > 0) {
            gsap.fromTo(features,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: featureRef.current,
                        start: "top 80%",
                    }
                }
            );
        }
    }, { scope: containerRef, dependencies: [services] });

    // Creates a dynamic, asymmetrical bento grid layout
    const getBentoClass = (index: number) => {
        const layoutPattern = [
            'md:col-span-2 lg:col-span-2', // 1st item (Wide)
            'md:col-span-1 lg:col-span-1', // 2nd item (Square)
            'md:col-span-1 lg:col-span-1', // 3rd item (Square)
            'md:col-span-2 lg:col-span-2', // 4th item (Wide)
            'md:col-span-1 lg:col-span-1', // 5th item (Square)
            'md:col-span-2 lg:col-span-2', // 6th item (Wide)
        ];
        return layoutPattern[index % layoutPattern.length];
    };

    // High-quality abstract tech/agency imagery tailored for Optimantix services
    const getServiceBackground = (slug: string) => {
        switch (slug) {
            case 'digital-marketing':
                return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'; // Analytics/Data
            case 'marketplace-management':
                return 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200'; // E-commerce/Boxes
            case 'development':
                return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200'; // Code/Tech
            case 'graphic-design':
                return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200'; // Abstract Design
            case 'hosting':
                return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200'; // Server/Infrastructure
            case 'communications':
                return 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1200'; // Network/Nodes
            default:
                return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200'; // Fallback Tech
        }
    };

    return (
        <div ref={containerRef} className="bg-gray-50 dark:bg-[#050505] min-h-screen selection:bg-primary selection:text-white">
<ParallaxHero
                title="End-to-End Digital Solutions"
                subtitle="We blend creative innovation with hard data to build scalable systems that drive explosive growth for your business."
                imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
            />

            {/* Main Services Section */}
            <section className="container mx-auto px-4 md:px-6 py-24 lg:py-32">
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Our Expertise</h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                        Empowering businesses with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">result-driven strategies.</span>
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        In a sea of agencies, Optimantix stands out. We execute complete digital transformations tailored to maximize your ROI across every channel.
                    </p>
                </div>

                {services.length > 0 ? (
                    <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[420px]">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`service-card group relative bg-white dark:bg-[#0a0a0a] rounded-[2rem] p-8 md:p-10 overflow-hidden hover:shadow-2xl dark:hover:shadow-primary/5 transition-all duration-700 border border-gray-200 dark:border-white/5 hover:border-primary/30 flex flex-col ${getBentoClass(index)}`}
                            >
                                {/* Background Image Setup */}
                                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                                    <img
                                        src={getServiceBackground(service.slug)}
                                        alt={service.title}
                                        className="w-full h-full object-cover opacity-[0.03] dark:opacity-10 group-hover:opacity-[0.08] dark:group-hover:opacity-30 group-hover:scale-110 transition-all duration-1000 ease-out filter grayscale group-hover:grayscale-0"
                                    />
                                    {/* Elegant Gradient Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/90 dark:to-transparent z-10"></div>
                                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent z-10"></div>
                                </div>

                                {/* Card Content */}
                                <div className="relative z-20 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 shadow-sm">
                                            <Icon name={service.iconName} size={32} />
                                        </div>

                                        {/* Decorative Corner Arrow */}
                                        <div className="w-10 h-10 rounded-full bg-transparent border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 -rotate-45 group-hover:rotate-0">
                                            <ArrowUpRight size={20} />
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-lg text-lg font-light">
                                        {service.shortDescription}
                                    </p>

                                    {/* Sub Services Pills */}
                                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                                        {service.subServices && service.subServices.length > 0 ? (
                                            <div className="flex flex-wrap gap-2.5">
                                                {service.subServices.slice(0, 4).map(sub => (
                                                    <Link
                                                        key={sub.id}
                                                        to={`/services/${service.slug}/${sub.slug}`}
                                                        className="text-xs font-semibold px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/5 transition-all hover:border-primary/50 hover:text-primary dark:hover:text-white backdrop-blur-sm"
                                                    >
                                                        {sub.title}
                                                    </Link>
                                                ))}
                                                {service.subServices.length > 4 && (
                                                    <span className="text-xs font-semibold px-4 py-2 rounded-full bg-transparent text-gray-500 border border-transparent">
                                                        +{service.subServices.length - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="h-8"></div> // Spacer
                                        )}
                                    </div>

                                    {/* Hidden Link Overlay to make the whole card clickable for better UX while preserving internal links */}
                                    <Link to={`/services/${service.slug}`} className="absolute inset-0 z-10" aria-label={`Explore ${service.title}`}></Link>

                                    {/* Elevate internal pills above the hidden link overlay */}
                                    <style>{`.service-card a { position: relative; z-index: 30; }`}</style>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center py-32">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                )}
            </section>

            {/* Why Choose Optimantix Section */}
            <section ref={featureRef} className="border-t border-gray-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                We don't just deliver.<br />
                                <span className="text-primary">We outperform.</span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Whether you are scaling on Amazon, upgrading your tech stack, or dominating search engines, our proven structured approach ensures measurable results.
                            </p>
                            <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg shadow-primary/25">
                                Start Your Transformation <ArrowUpRight className="ml-2" size={20} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="feature-item p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                <BarChart3 className="text-primary mb-4" size={32} />
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Data-Driven</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Every decision is backed by deep analytics and A/B testing to ensure maximum ROI.</p>
                            </div>
                            <div className="feature-item p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                <Users className="text-primary mb-4" size={32} />
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Dedicated Team</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Direct access to experienced project managers, developers, and marketing experts.</p>
                            </div>
                            <div className="feature-item p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                <ShieldCheck className="text-primary mb-4" size={32} />
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Enterprise Security</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Bank-grade security protocols applied for all web assets and hosting environments.</p>
                            </div>
                            <div className="feature-item p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                <Zap className="text-primary mb-4" size={32} />
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fast Turnaround</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Agile sprints ensure we execute, optimize, and launch faster than the competition.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
