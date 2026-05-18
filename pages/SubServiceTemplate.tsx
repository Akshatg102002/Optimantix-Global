import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ServiceGrowthChart } from '../components/ServiceGrowthChart';
import {
  Check, ArrowLeft, Star, Zap, Map, ArrowRight, LayoutGrid, Quote,
  ChevronDown, ChevronUp, Search, Megaphone, Package, Star as StarIcon,
  Shield, HeadphonesIcon, BarChart2, Layers, Globe, Palette, Server, Mail,
  ShoppingCart, Code, FileText, Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/SEO';
import { AUTHENTIC_CASE_STUDIES } from '../data/caseStudies';
import type { SubService } from '../types';

// ─── Icon resolver ─────────────────────────────────────────────────────────────
const ServiceIcon: React.FC<{ name?: string; size?: number; className?: string }> = ({
  name = '', size = 32, className = '',
}) => {
  const map: Record<string, React.ElementType> = {
    'search-optimization': Search,
    'advertising': Megaphone,
    'inventory': Package,
    'reviews': StarIcon,
    'brand-protection': Shield,
    'support': HeadphonesIcon,
    'analytics': BarChart2,
    'layers': Layers,
    'globe': Globe,
    'palette': Palette,
    'server': Server,
    'mail': Mail,
    'shopping-cart': ShoppingCart,
    'code': Code,
    'file': FileText,
    'pricing': BarChart2,
  };
  const Icon = map[name] ?? LayoutGrid;
  return <Icon size={size} className={className} />;
};

// ─── Comparison table icons ────────────────────────────────────────────────────
const Tick: React.FC = () => (
  <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-green-500/15 text-green-500 shrink-0">
    <Check size={12} strokeWidth={3} />
  </span>
);
const Cross: React.FC = () => (
  <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-gray-200 dark:bg-gray-700 text-gray-400 shrink-0 text-[10px] font-bold leading-none">
    ✕
  </span>
);

// ─── CTA action resolver ───────────────────────────────────────────────────────
// Supports `prompt` (chat sendPrompt) and `url` (hard navigation).
const resolveCtaAction = (
  btn: { prompt?: string; url?: string }
): (() => void) | undefined => {
  if (btn.prompt) {
    return () => {
      if (typeof window !== 'undefined' && (window as any).sendPrompt) {
        (window as any).sendPrompt(btn.prompt);
      }
    };
  }
  if (btn.url) return () => { window.location.href = btn.url!; };
  return undefined;
};

// ─── Reusable section header ───────────────────────────────────────────────────
const SectionHeader: React.FC<{
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
}> = ({ label, title, description, center = true }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    {label && (
      <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
        {label}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
      {title}
    </h2>
    {description && (
      <p className={`text-lg text-gray-600 dark:text-gray-400 ${center ? 'max-w-3xl mx-auto' : ''} whitespace-pre-line`}>
        {description}
      </p>
    )}
  </div>
);

// ─── Main component ────────────────────────────────────────────────────────────
export const SubServiceTemplate: React.FC = () => {
  const { slug, subSlug } = useParams<{ slug: string; subSlug: string }>();
  const { services } = useData();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const service = services.find(s => s.slug === slug);
  const subService = service?.subServices?.find(sub => sub.slug === subSlug) as SubService | undefined;

  const MotionDiv = motion.div as React.ElementType;

  if (!service || !subService) return <Navigate to="/404" replace />;

  const relevantCaseStudies = AUTHENTIC_CASE_STUDIES.filter(cs => cs.subServiceId === subService.id);

  const getServiceImage = (s: string) => {
    const map: Record<string, string> = {
      'digital-marketing': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000',
      'marketplace-management': 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=2000',
      'development': 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=2000',
      'graphic-design': 'https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=2000',
      'hosting': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000',
      'communications': 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=2000',
    };
    return map[s] ?? 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000';
  };

  const isNewLayout = !!subService.page_title;
  const title = isNewLayout ? (subService.hero_section?.headline || subService.page_title) : subService.title;
  const subtitle = isNewLayout ? (subService.hero_section?.lead_text ?? '') : subService.shortDescription;

  // Dynamic stat grid column count
  const statCount = subService.statistics_section?.stats?.length ?? 0;
  const statCols =
    statCount <= 2 ? 'sm:grid-cols-2' :
      statCount === 3 ? 'sm:grid-cols-3' :
        'sm:grid-cols-4';

  return (
    <div className="bg-light dark:bg-dark min-h-screen">
      <SEO
        title={subService.seo?.meta_title || `${title} - ${service.title}`}
        description={subService.seo?.meta_description || subtitle || ''}
      />

      {/* ── BANNER IMAGE ───────────────────────────────────────────────────── */}
      <div
        className="hidden md:block w-full h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${subService.banners?.desktop || getServiceImage(service.slug)})` }}
      />
      <div
        className="md:hidden w-full h-[260px] bg-cover bg-center"
        style={{ backgroundImage: `url(${subService.banners?.mobile || getServiceImage(service.slug)})` }}
      />

      {/* ── HERO / TITLE ───────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-dark text-center py-10 px-4 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />

        {/* Badge pill ── hero_section.badge */}
        {subService.hero_section?.badge && (
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {subService.hero_section.badge}
          </span>
        )}

        {/* Headline ── hero_section.headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight max-w-4xl">
          {title}
        </h1>

        {/* Lead text ── hero_section.lead_text */}
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* CTA buttons ── hero_section.call_to_action_buttons */}
        {(subService.hero_section?.call_to_action_buttons?.length ?? 0) > 0 ? (
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {subService.hero_section!.call_to_action_buttons!.map((btn, idx) => {
              const action = resolveCtaAction(btn);
              return btn.type === 'primary' ? (
                <button
                  key={idx}
                  onClick={action}
                  className="inline-flex items-center justify-center bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-105"
                >
                  {btn.text}
                </button>
              ) : (
                <button
                  key={idx}
                  onClick={action}
                  className="inline-flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105"
                >
                  {btn.text}
                </button>
              );
            })}
          </div>
        ) : (
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-105 mb-6"
          >
            Connect With Us <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        )}

        {/* Trust strip ── hero_section.trust_items (Nykaa, ecommerce dev) */}
        {(subService.hero_section?.trust_items?.length ?? 0) > 0 && (
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-1">
            {subService.hero_section!.trust_items!.map((item, idx) => (
              <span key={idx} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── PAGE BODY ──────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center text-primary font-medium hover:underline mb-8"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to {service.title}
        </Link>

        {/* ══════════════════════════════════════════════════════════════════
            NEW LAYOUT — JSON has `page_title`
        ══════════════════════════════════════════════════════════════════ */}
        {isNewLayout ? (
          <div className="max-w-6xl mx-auto space-y-24">

            {/* ── Statistics ────────────────────────────────────────────── */}
            {statCount > 0 && (
              <div className={`grid grid-cols-2 ${statCols} gap-6`}>
                {subService.statistics_section!.stats.map((stat, idx) => (
                  <div key={idx} className="text-center p-6 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Services Grid ──────────────────────────────────────────── */}
            {subService.services_section && (
              <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <SectionHeader
                  label={subService.services_section.section_label}
                  title={subService.services_section.title}
                  description={subService.services_section.description}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {subService.services_section.services_grid.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-colors"
                    >
                      {/* Number badge ── item.number (ecommerce dev) */}
                      {item.number && (
                        <span className="text-xs font-bold tracking-widest text-primary/40 mb-3 block">
                          {item.number}
                        </span>
                      )}
                      <ServiceIcon name={item.icon} size={32} className="text-primary mb-5" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* ── Platforms ── platforms_section (ecommerce dev) ─────────── */}
            {subService.platforms_section && (
              <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <SectionHeader
                  label={subService.platforms_section.section_label}
                  title={subService.platforms_section.title}
                  description={subService.platforms_section.description}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {subService.platforms_section.platforms.map((platform, idx) => (
                    <div key={idx} className="flex gap-5 items-start bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                        {platform.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{platform.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{platform.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* ── Timeline ── timeline_section (Nykaa) ───────────────────── */}
            {subService.timeline_section && (
              <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <SectionHeader
                  label={subService.timeline_section.section_label}
                  title={subService.timeline_section.title}
                  description={subService.timeline_section.description}
                />
                <div className="relative max-w-3xl mx-auto">
                  {/* Vertical connector line */}
                  <div className="absolute left-[21px] top-4 bottom-4 w-px bg-primary/20" />
                  <div className="space-y-8">
                    {subService.timeline_section.items.map((item, idx) => (
                      <div key={idx} className="flex gap-6 items-start">
                        <div className="relative shrink-0 w-11 h-11 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center z-10">
                          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        </div>
                        <div className="bg-white dark:bg-dark-card p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex-1 shadow-sm">
                          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-1 block">
                            {item.period}
                          </span>
                          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionDiv>
            )}

            {/* ── Comparison table ── comparison_section (Nykaa) ─────────── */}
            {subService.comparison_section && (
              <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <SectionHeader
                  label={subService.comparison_section.section_label}
                  title={subService.comparison_section.title}
                  description={subService.comparison_section.description}
                />
                <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-dark-card border-b border-gray-100 dark:border-gray-800">
                        <th className="text-left px-5 py-4 font-semibold text-gray-700 dark:text-gray-300 w-44 md:w-56">
                          Feature
                        </th>
                        {subService.comparison_section.columns.map((col, i) => {
                          const isLast = i === subService.comparison_section!.columns.length - 1;
                          return (
                            <th
                              key={i}
                              className={`px-5 py-4 text-center font-semibold ${isLast
                                  ? 'text-primary bg-primary/5 dark:bg-primary/10'
                                  : 'text-gray-500 dark:text-gray-400'
                                }`}
                            >
                              {col}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {subService.comparison_section.rows.map((row, idx) => (
                        <tr
                          key={idx}
                          className={`border-b border-gray-100 dark:border-gray-800 last:border-0 ${idx % 2 === 0 ? 'bg-white dark:bg-dark' : 'bg-gray-50/50 dark:bg-dark-card/40'
                            }`}
                        >
                          <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white">{row.feature}</td>
                          {/* DIY */}
                          <td className="px-5 py-3.5 text-center">
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                              {row.diy.value ? <Tick /> : <Cross />}
                              {row.diy.note && (
                                <span className="text-xs text-gray-400">{row.diy.note}</span>
                              )}
                            </div>
                          </td>
                          {/* Generic */}
                          <td className="px-5 py-3.5 text-center">
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                              {row.generic.value ? <Tick /> : <Cross />}
                              {row.generic.note && (
                                <span className="text-xs text-gray-400">{row.generic.note}</span>
                              )}
                            </div>
                          </td>
                          {/* Optimantix */}
                          <td className="px-5 py-3.5 text-center bg-primary/5 dark:bg-primary/10">
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                              {row.optimantix.value ? <Tick /> : <Cross />}
                              {row.optimantix.note && (
                                <span className="text-xs font-medium text-primary">{row.optimantix.note}</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </MotionDiv>
            )}

            {/* ── Process ───────────────────────────────────────────────── */}
            {subService.process_section && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-gray-50 dark:bg-dark-card/50 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800"
              >
                <SectionHeader
                  label={subService.process_section.section_label}
                  title={subService.process_section.title}
                  description={subService.process_section.description}
                />
                <div className="space-y-6 max-w-4xl mx-auto">
                  {subService.process_section.steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-5 items-start bg-white dark:bg-dark p-6 rounded-2xl shadow-sm">
                      <div className="flex-shrink-0 w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-lg font-bold">
                        {step.step_number}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3>
                          {/* Tag badge ── step.tag (ecommerce dev e.g. "Week 1–2") */}
                          {step.tag && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700/50 px-2.5 py-0.5 rounded-full">
                              <Clock size={10} /> {step.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* ── Why Us ────────────────────────────────────────────────── */}
            {subService.why_us_section && (
              <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <SectionHeader
                  label={subService.why_us_section.section_label}
                  title={subService.why_us_section.title}
                  description={subService.why_us_section.description}
                />

                {/* Headline metric ── why_us_section.headline_metric (ecommerce dev) */}
                {subService.why_us_section.headline_metric && (
                  <div className="mb-10">
                    <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 rounded-2xl p-8 mb-4 relative overflow-hidden">
                      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-primary/5 -mr-12 -mb-12" />
                      <div className="text-6xl md:text-7xl font-bold text-primary leading-none mb-2">
                        {subService.why_us_section.headline_metric.value}
                      </div>
                      <div className="text-base text-gray-700 dark:text-gray-300 mb-1 font-medium">
                        {subService.why_us_section.headline_metric.label}
                      </div>
                      {subService.why_us_section.headline_metric.note && (
                        <div className="text-sm text-gray-400 dark:text-gray-500 italic">
                          {subService.why_us_section.headline_metric.note}
                        </div>
                      )}
                    </div>

                    {/* Mini metrics ── why_us_section.mini_metrics (ecommerce dev) */}
                    {(subService.why_us_section.mini_metrics?.length ?? 0) > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {subService.why_us_section.mini_metrics!.map((m, idx) => (
                          <div key={idx} className="bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{m.value}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Features checklist */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {subService.why_us_section.features_grid.map((feature, idx) => (
                    <div key={idx} className="flex gap-4">
                      <Check className="text-green-500 shrink-0 mt-1" size={22} />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* ── Tech Stack ── tech_stack_section (ecommerce dev) ──────── */}
            {subService.tech_stack_section && (
              <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <SectionHeader
                  label={subService.tech_stack_section.section_label}
                  title={subService.tech_stack_section.title}
                  description={subService.tech_stack_section.description}
                />
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {subService.tech_stack_section.technologies.map((tech, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 rounded-xl p-4 hover:border-primary/30 transition-colors">
                      <span className="text-2xl">{tech.icon}</span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* ── Results ── results_section (ecommerce dev) ─────────────── */}
            {subService.results_section && (
              <MotionDiv initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <SectionHeader
                  label={subService.results_section.section_label}
                  title={subService.results_section.title}
                  description={subService.results_section.description}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                  {/* Case result cards */}
                  <div className="space-y-5">
                    {subService.results_section.case_results.map((result, idx) => (
                      <div key={idx} className="flex gap-5 items-start bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 rounded-2xl p-6 hover:border-primary/30 transition-colors">
                        <div className="text-4xl font-bold text-primary leading-none shrink-0 min-w-[72px]">
                          {result.metric}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-1.5">{result.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{result.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Performance benchmarks */}
                  {(subService.results_section.performance_benchmarks?.length ?? 0) > 0 && (
                    <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">
                        Performance Benchmarks We Target on Every Build
                      </h3>
                      <div className="space-y-5">
                        {subService.results_section.performance_benchmarks!.map((bench, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600 dark:text-gray-400">{bench.label}</span>
                              <span className="text-sm font-bold text-primary">{bench.target}</span>
                            </div>
                            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all duration-1000"
                                style={{ width: `${bench.bar_percent}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </MotionDiv>
            )}

            {/* ── Testimonials ──────────────────────────────────────────── */}
            {subService.testimonials_section && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-primary text-white rounded-3xl p-8 md:p-12 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="text-center mb-12 relative z-10">
                  <span className="text-white/70 font-bold tracking-wider uppercase text-sm mb-2 block">
                    {subService.testimonials_section.section_label}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    {subService.testimonials_section.title}
                  </h2>
                  {/* description ── present on ecommerce dev page */}
                  {subService.testimonials_section.description && (
                    <p className="text-white/70 max-w-xl mx-auto text-base">
                      {subService.testimonials_section.description}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {subService.testimonials_section.testimonials.map((t, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm p-7 rounded-2xl border border-white/20 flex flex-col">
                      <Quote className="text-white/30 mb-4" size={28} />
                      <p className="text-base font-medium mb-6 leading-relaxed flex-1">"{t.quote}"</p>
                      <div className="flex items-center gap-3">
                        {/* Initials avatar ── t.initials (ecommerce dev) */}
                        {t.initials && (
                          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0">
                            {t.initials}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-sm">{t.author}</p>
                          {/* Role ── t.role (ecommerce dev) */}
                          {t.role && (
                            <p className="text-white/60 text-xs mt-0.5">{t.role}</p>
                          )}
                          {/* Location + category pills ── marketplace pages */}
                          {(t.location || t.category) && (
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              {t.location && (
                                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{t.location}</span>
                              )}
                              {t.category && (
                                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{t.category}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* ── FAQ ───────────────────────────────────────────────────── */}
            {subService.faq_section && (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <SectionHeader
                  label={subService.faq_section.section_label}
                  title={subService.faq_section.title}
                  description={subService.faq_section.description}
                />
                <div className="space-y-3">
                  {subService.faq_section.questions.map((faq, idx) => (
                    <div key={idx} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                      >
                        <span className="font-bold text-gray-900 dark:text-white pr-4 text-sm md:text-base">
                          {faq.question}
                        </span>
                        {openFaq === idx
                          ? <ChevronUp className="text-primary shrink-0" size={20} />
                          : <ChevronDown className="text-gray-400 shrink-0" size={20} />
                        }
                      </button>
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 border-t border-gray-100 dark:border-gray-800 pt-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                              {faq.answer}
                              {/* Inline links ── faq.links[] */}
                              {(faq.links?.length ?? 0) > 0 && (
                                <div className="mt-3 flex flex-wrap gap-3">
                                  {faq.links!.map((link, li) => (
                                    <a
                                      key={li}
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-primary font-semibold hover:underline text-sm"
                                    >
                                      {link.text} <ArrowRight size={13} />
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </MotionDiv>
            )}

            {/* ── Bottom CTA ────────────────────────────────────────────── */}
            {subService.bottom_cta_section && (() => {
              const cta = subService.bottom_cta_section!;
              const action = resolveCtaAction(cta.call_to_action_button);
              const secAction = cta.secondary_button
                ? resolveCtaAction(cta.secondary_button)
                : undefined;

              return (
                <div className="bg-light dark:bg-dark-card border-t-4 border-primary rounded-2xl p-8 md:p-12 text-center shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{cta.title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                    {cta.description}
                  </p>

                  <div className="flex flex-wrap gap-4 justify-center">
                    {/* Primary CTA — prompt or url or /contact fallback */}
                    {action ? (
                      <button
                        onClick={action}
                        className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary transition shadow-lg shadow-primary/20 text-base"
                      >
                        {cta.call_to_action_button.text}
                      </button>
                    ) : (
                      <Link
                        to="/contact"
                        className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary transition shadow-lg shadow-primary/20 text-base"
                      >
                        {cta.call_to_action_button.text}
                      </Link>
                    )}

                    {/* Secondary button ── bottom_cta_section.secondary_button (ecommerce dev) */}
                    {cta.secondary_button && (
                      secAction ? (
                        <button
                          onClick={secAction}
                          className="inline-block border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary px-8 py-4 rounded-xl font-bold transition text-base"
                        >
                          {cta.secondary_button.text}
                        </button>
                      ) : (
                        <Link
                          to="/contact"
                          className="inline-block border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary px-8 py-4 rounded-xl font-bold transition text-base"
                        >
                          {cta.secondary_button.text}
                        </Link>
                      )
                    )}
                  </div>

                  {/* Sub note ── bottom_cta_section.sub_note (ecommerce dev) */}
                  {cta.sub_note && (
                    <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">{cta.sub_note}</p>
                  )}
                </div>
              );
            })()}

          </div>

        ) : (
          /* ════════════════════════════════════════════════════════════════
              LEGACY LAYOUT — no `page_title`
          ════════════════════════════════════════════════════════════════ */
          <div className="max-w-4xl mx-auto space-y-16">

            {/* Overview */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About this Service</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-8">
                {subService.fullDescription}
              </p>
              {(((subService.features?.length ?? 0) > 0) || ((subService.benefits?.length ?? 0) > 0)) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(subService.features?.length ?? 0) > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Star className="text-yellow-400" size={20} /> Key Features
                      </h3>
                      <ul className="space-y-3">
                        {subService.features!.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <Check className="text-green-500 shrink-0 mt-0.5" size={16} /> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(subService.benefits?.length ?? 0) > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Zap className="text-primary" size={20} /> Benefits
                      </h3>
                      <ul className="space-y-3">
                        {subService.benefits!.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </MotionDiv>

            {/* Growth Roadmap */}
            {(subService.phases?.length ?? 0) > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
                  <Map className="text-primary" /> Strategic Roadmap
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {subService.phases!.map((phase, idx) => (
                    <div key={idx} className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-100 dark:border-gray-800 relative hover:-translate-y-1 transition-transform">
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                        {idx + 1}
                      </div>
                      <h3 className="font-bold text-lg mb-2 mt-2">{phase.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{phase.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Case Studies */}
            {relevantCaseStudies.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relevantCaseStudies.map(study => (
                    <Link
                      to={`/case/${study.slug}`}
                      key={study.id}
                      className="group block bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition"
                    >
                      <div className="h-48 overflow-hidden">
                        <img src={study.imageUrl} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition">{study.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{study.excerpt}</p>
                        <div className="mt-4 flex items-center text-primary font-medium text-sm">
                          Read Case Study <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Stats Chart */}
            {(subService.stats?.length ?? 0) > 0 && (
              <ServiceGrowthChart stats={subService.stats!} serviceName={subService.title!} />
            )}

            {/* Legacy CTA */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Why Optimantix for {subService.title}?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                We combine industry expertise with data-driven strategies to ensure you get the best possible ROI.
                Our team is dedicated to your success on platforms like {subService.title} and beyond.
              </p>
              <Link to="/contact" className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary transition shadow-lg shadow-primary/20">
                Speak to an Expert
              </Link>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
