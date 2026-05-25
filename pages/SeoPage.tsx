import React from 'react';
import { SEO } from '../components/SEO';
import { SEO_PDP_DATA } from '../data/seoConstants';
import { Link } from 'react-router-dom';

export const SeoPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen text-gray-900 dark:text-gray-100">
      <SEO 
        title="SEO Services | Optimantix Global"
        description={SEO_PDP_DATA.hero.description}
      />
      
      {/* HERO */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-[#0a0a0a]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
            {SEO_PDP_DATA.hero.title} <span className="text-primary">{SEO_PDP_DATA.hero.titleAccent}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
            {SEO_PDP_DATA.hero.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary transition shadow-lg">
              Book Strategy Call
            </Link>
            <Link to="/free-seo-audit" className="bg-white text-primary border-2 border-primary font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition shadow-sm dark:bg-transparent dark:hover:bg-gray-800">
              Free SEO Audit
            </Link>
          </div>
        </div>
      </section>

      {/* INVISIBLE Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{SEO_PDP_DATA.invisible.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{SEO_PDP_DATA.invisible.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SEO_PDP_DATA.invisible.items.map((item, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-dark-card p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#111]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">{SEO_PDP_DATA.whatWeDo.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{SEO_PDP_DATA.whatWeDo.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{SEO_PDP_DATA.whatWeDo.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SEO_PDP_DATA.whatWeDo.items.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">{SEO_PDP_DATA.whoWeServe.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{SEO_PDP_DATA.whoWeServe.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{SEO_PDP_DATA.whoWeServe.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SEO_PDP_DATA.whoWeServe.items.map((item, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-[#111] p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-dark-card border-y border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">{SEO_PDP_DATA.process.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{SEO_PDP_DATA.process.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{SEO_PDP_DATA.process.description}</p>
          </div>
          <div className="space-y-8">
            {SEO_PDP_DATA.process.steps.map((step, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-6 bg-white dark:bg-[#0a0a0a] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="text-5xl font-extrabold text-blue-100 dark:text-gray-800 shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REPORTING */}
      <section className="py-16 bg-white dark:bg-[#111]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
           <h2 className="text-3xl font-bold mb-4">{SEO_PDP_DATA.reporting.title}</h2>
           <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">{SEO_PDP_DATA.reporting.description}</p>
           <div className="flex flex-wrap justify-center gap-4">
             {SEO_PDP_DATA.reporting.points.map((pt, i) => (
                <span key={i} className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full font-medium shadow-sm">
                  {pt}
                </span>
             ))}
           </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-dark">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">{SEO_PDP_DATA.pricing.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{SEO_PDP_DATA.pricing.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{SEO_PDP_DATA.pricing.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {SEO_PDP_DATA.pricing.packages.map((pkg, idx) => (
               <div key={idx} className={`bg-white dark:bg-dark-card rounded-3xl p-8 border ${pkg.isPopular ? 'border-primary shadow-xl scale-105 z-10 relative' : 'border-gray-100 dark:border-gray-800 shadow-md'}`}>
                 {pkg.isPopular && <div className="bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block mb-4">MOST POPULAR</div>}
                 <h3 className="text-3xl font-bold mb-2">{pkg.title}</h3>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 h-10">{pkg.sub}</p>
                 <ul className="space-y-3 mb-8 text-sm text-gray-700 dark:text-gray-300">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex gap-2 items-start">
                        <span className="text-primary font-bold">✓</span> {feature}
                      </li>
                    ))}
                 </ul>
                 <Link to="/contact" className={`block text-center w-full py-3 rounded-xl font-bold transition ${pkg.isPopular ? 'bg-primary text-white hover:bg-secondary' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                   {pkg.buttonText}
                 </Link>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#111]">
         <div className="container mx-auto px-4 max-w-3xl">
           <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{SEO_PDP_DATA.faq.title}</h2>
           <div className="space-y-6">
              {SEO_PDP_DATA.faq.items.map((item, idx) => (
                 <div key={idx} className="border-b border-gray-100 dark:border-gray-800 pb-6">
                   <h4 className="text-lg font-bold mb-3">{item.q}</h4>
                   <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.a}</p>
                 </div>
              ))}
           </div>
         </div>
      </section>
    </div>
  );
};
