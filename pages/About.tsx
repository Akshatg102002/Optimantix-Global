import React, { useRef, useState } from 'react';
import { CheckCircle, Sparkles, Linkedin, Target, Eye, Award, Users, TrendingUp, BarChart } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    name: "Rahul Chauhan",
    role: "Founder & CEO",
    image: null, // Will use avatar
    linkedin: "https://linkedin.com/company/optimantix",
    initials: "RC"
  },

  {
    name: "Deepak Yadav",
    role: "Marketplace Manager",
    image: null,
    linkedin: "https://linkedin.com/company/optimantix",
    initials: "DY"
  }
];

const STATS = [
  { number: "10+", label: "Years Experience" },
  { number: "500+", label: "Projects Delivered" },
  { number: "200+", label: "Happy Clients" },
  { number: "3x", label: "Average Traffic Growth" }
];

const VALUES = [
  {
    icon: Target,
    title: "Integrity",
    description: "We do what we say we'll do. Our recommendations are honest, our reporting is transparent, and our commitment to your success is unwavering."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Good isn't good enough. We pursue excellence in every campaign, every deliverable, and every client interaction."
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Digital marketing is constantly evolving, and so are we. We embrace change, explore new technologies, and test innovative approaches."
  },
  {
    icon: Users,
    title: "Partnership",
    description: "Your success is our success. We're invested in your growth, and we approach every project with the mindset of a true partner."
  }
];

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

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

    // Text Reveal Animation on Load
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

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-indigo-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div ref={containerRef} className="bg-light dark:bg-dark min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <SEO
        title="About Us - Digital Marketing Agency | Optimantix Global"
        description="Learn about Optimantix Global - a dynamic digital marketing agency in Noida with 10+ years of experience in SEO, SEM, SMM, and Marketplace Management."
      />

      {/* Parallax Hero Section */}
      <div ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 h-[120%] -top-[10%]">
          <img
            ref={heroBgRef}
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
            alt="Digital marketing team collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>
        </div>

        <div ref={heroTextRef} className="container relative z-10 px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 mt-16 md:mt-24">
            Transforming Digital <br />
            Aspirations Into Success
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Where innovation meets performance, and every strategy is built to deliver results that matter.
          </p>
        </div>
      </div>

      {/* Who We Are Section */}
      <section className="py-24 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">Who We Are</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              At <span className="font-bold text-primary">Optimantix Global</span>, we believe that every business—regardless of size—deserves a powerful online presence that drives real growth. Founded on the principle that digital marketing should be transparent, scalable, and results-driven, we've established ourselves as a trusted partner for businesses seeking not just visibility, but sustainable success in the digital landscape.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Headquartered in <span className="font-semibold">Noida</span>, we are a dynamic digital marketing agency that combines strategic thinking with cutting-edge execution. We don't just run campaigns—we build digital ecosystems that transform how businesses connect with their audiences, convert prospects into customers, and create lasting brand value.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              With over <span className="font-bold text-primary">10+ years of experience</span>, we've worked across diverse industries—from ambitious startups taking their first digital steps to established enterprises reimagining their online strategy. Each partnership has reinforced our belief that success in digital marketing isn't about shortcuts or gimmicks; it's about understanding your unique challenges, setting clear objectives, and executing with precision.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/90 text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-light dark:bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="bg-white dark:bg-dark-card p-10 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                To empower businesses with innovative digital marketing, marketplace management, and technology-driven solutions that deliver measurable growth and long-term success.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-dark-card p-10 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                <Eye size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                To become a global leader in digital transformation by helping brands of all sizes adapt, compete, and thrive in the ever-changing digital landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Core Values</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">The principles that guide every strategy, campaign, and client interaction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-gray-50 dark:bg-[#111] p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-24 bg-light dark:bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">What Sets Us Apart</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Why businesses choose Optimantix Global as their digital growth partner.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-white dark:bg-dark-card p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Unwavering Focus on ROI</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Every strategy we craft is measured against one critical question: Is this driving tangible business results? Our success is measured by yours.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-card p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Client-First Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                You're not just a client; you're a partner. Transparency isn't a buzzword for us—it's how we operate every single day.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-card p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">End-to-End Solutions</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                From SEO to social media, marketplace optimization to brand building—we offer comprehensive services under one roof.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-card p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">10+ Years Experience</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We combine battle-tested strategies with cutting-edge tools, ensuring your brand benefits from both wisdom and innovation.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-card p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <BarChart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Data-Driven Decisions</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Every strategy is backed by thorough research, competitor analysis, and performance data. We let the numbers guide us.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-card p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Industry Versatility</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We've worked across retail, technology, education, hospitality, real estate, e-commerce, and emerging startups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">Our Leadership Team</span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Expert minds. <br /> Proven results.</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
              Meet the professionals driving our digital strategies, technology implementation, and client success. Our leadership brings deep expertise and a commitment to delivering measurable results.
            </p>
            <a
              href="https://linkedin.com/company/optimantix"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-secondary text-white font-bold px-8 py-3 rounded-full transition-colors shadow-lg shadow-blue-500/20"
            >
              Connect on LinkedIn
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/30 transition-colors"></div>

                  {member.image && !imageErrors[idx] ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      onError={() => handleImageError(idx)}
                      className="w-full h-full object-cover rounded-full relative z-10 border-4 border-white dark:border-gray-700 shadow-md"
                    />
                  ) : (
                    <div className={`w-full h-full ${getAvatarColor(idx)} rounded-full relative z-10 border-4 border-white dark:border-gray-700 shadow-md flex items-center justify-center text-white text-3xl font-bold`}>
                      {member.initials}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 hover:bg-primary hover:text-white transition-colors"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-light dark:bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-dark to-gray-900 dark:from-black dark:to-gray-950 rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="lg:w-1/2 p-12 md:p-16 flex flex-col justify-center">
              <span className="text-gray-400 font-bold text-xs tracking-widest uppercase mb-4">Take the next step</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to transform <br /> your digital presence?
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-md">
                Connect with our digital marketing experts to discuss tailored strategies for your business. Let's drive measurable growth together.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="bg-primary hover:bg-secondary text-white font-bold px-8 py-4 rounded-lg transition-colors shadow-lg shadow-primary/20">
                  Get Free Consultation
                </Link>
                <Link to="/services" className="bg-transparent border-2 border-gray-600 hover:border-primary text-white font-bold px-8 py-4 rounded-lg transition-colors">
                  Explore Services
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
                alt="Digital marketing analytics dashboard"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-dark/20 to-dark pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
