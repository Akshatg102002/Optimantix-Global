import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { FREE_TOOLS, getCategoryAnchor, getToolBySlug } from '../data/freeTools';

const BASE_URL = 'https://optimantix-marketplace-h94c.arcada.app';

export const ToolPage: React.FC = () => {
  const { slug } = useParams();
  const tool = getToolBySlug(slug);
  if (!tool) return <Navigate to="/404" replace />;
  const related = FREE_TOOLS.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 3);
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: tool.name, url: `${BASE_URL}/free-tools/${tool.slug}/`, description: tool.description, applicationCategory: 'UtilityApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, provider: { '@type': 'Organization', name: 'Optimantix Global', url: `${BASE_URL}/` }, featureList: ['Free to use','No signup required','Instant results'], screenshot: `${BASE_URL}/tools-screenshot.png`, softwareVersion: '1.0' },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Free Tools', item: `${BASE_URL}/free-tools/` },
      { '@type': 'ListItem', position: 3, name: tool.category, item: `${BASE_URL}/free-tools/#${getCategoryAnchor(tool.category)}` },
      { '@type': 'ListItem', position: 4, name: tool.name, item: `${BASE_URL}/free-tools/${tool.slug}/` }
    ]}
  ];
  return <div className="bg-light dark:bg-dark text-slate-900 dark:text-gray-100">
    <SEO title={`${tool.name} — Free Tool | Optimantix Global`} description={`Use our free ${tool.name} to ${tool.action}. No signup required. Instant results for AEO and AI visibility optimisation.`} canonical={`${BASE_URL}/free-tools/${tool.slug}/`} schemaMarkup={schemas} />
    <section className="pt-16 pb-10 bg-[#020617] text-white"><div className="container mx-auto px-4 max-w-4xl text-center"><nav className="text-sm text-gray-400 mb-8">Home &gt; Free Tools &gt; {tool.category} &gt; {tool.name}</nav><span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold text-xs tracking-widest">FREE TOOL</span><h1 className="text-4xl md:text-6xl font-bold my-6">{tool.name}</h1><p className="text-xl text-gray-300 mb-8">{tool.description} It helps SEO, AEO, and marketplace growth teams prioritise faster improvements with a simple browser-based workflow.</p><a href="#tool" className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-secondary">Use {tool.name} Free <ArrowRight className="ml-2"/></a></div></section>
    <section id="tool" className="py-16"><div className="container mx-auto px-4 max-w-5xl grid lg:grid-cols-2 gap-8"><div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-3xl p-8"><h2 className="text-2xl font-bold mb-4">Tool Interface</h2><label className="text-sm font-semibold text-gray-500">Enter URL, keyword, or brief</label><textarea className="mt-2 w-full min-h-40 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4" placeholder={`Paste details to ${tool.action}...`} /><button className="mt-4 w-full bg-primary text-white py-3 rounded-xl font-bold">{tool.category === 'Generators' ? 'Generate' : tool.category === 'Checkers & Validators' ? 'Check' : 'Analyse'}</button></div><div className="bg-[#020617] text-white rounded-3xl p-8"><h2 className="text-2xl font-bold mb-4">Results Output</h2><div className="space-y-4 text-gray-300"><p>Score: <strong className="text-primary">Demo Ready</strong></p><p>Key insight: Improve entity clarity, add structured data, and include stronger citation signals.</p><p>Next action: Export recommendations and assign implementation priorities.</p></div></div></div></section>
    <section className="py-12 bg-white dark:bg-dark-card"><div className="container mx-auto px-4"><h2 className="text-3xl font-bold text-center mb-10">How It Works</h2><div className="grid md:grid-cols-3 gap-6">{['Enter your details','Run the analysis','Get actionable insights'].map((s,i)=><div key={s} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 text-center"><div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">{i+1}</div><h3 className="font-bold">{s}</h3></div>)}</div></div></section>
    <section className="py-16"><div className="container mx-auto px-4 max-w-5xl"><h2 className="text-3xl font-bold mb-8">Why Use This Tool</h2><div className="grid md:grid-cols-2 gap-4">{['Free to use with no signup required','Built for AEO and AI visibility workflows','Simple placeholder interface for fast planning','Actionable outputs your team can prioritise'].map(f=><div key={f} className="flex gap-3 bg-white dark:bg-dark-card p-5 rounded-2xl border border-gray-200 dark:border-gray-800"><CheckCircle className="text-primary"/><span>{f}</span></div>)}</div></div></section>
    <section className="py-12 bg-white dark:bg-dark-card"><div className="container mx-auto px-4"><h2 className="text-3xl font-bold mb-8">Related Tools</h2><div className="grid md:grid-cols-3 gap-6">{related.map(r=><Link key={r.slug} to={`/free-tools/${r.slug}/`} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:text-primary"><div className="text-2xl mb-3">{r.icon}</div><h3 className="font-bold">{r.name}</h3><p className="text-sm text-gray-500 mt-2">{r.description}</p></Link>)}</div></div></section>
    <section className="py-16"><div className="container mx-auto px-4 max-w-4xl"><h2 className="text-3xl font-bold mb-8">FAQ</h2>{[`What is ${tool.name}?`,`Is ${tool.name} free?`,`Who should use ${tool.name}?`,`Do I need to sign up?`].map((q,i)=><details key={q} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-gray-800 p-5 mb-3"><summary className="font-bold cursor-pointer">{q}</summary><p className="mt-3 text-gray-600 dark:text-gray-400">{i===0?tool.description:'This tool is free, browser-based, and designed for SEO, AEO, content, and growth teams that need quick directional insights.'}</p></details>)}</div></section>
  </div>;
};
