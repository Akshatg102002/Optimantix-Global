import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { FREE_TOOL_CATEGORIES, FREE_TOOLS } from '../data/freeTools';

export const FreeToolsHub: React.FC = () => {
  const [filter, setFilter] = useState('All');

  return <div className="bg-light dark:bg-dark text-slate-900 dark:text-gray-100">
    <section className="pt-20 pb-16 bg-[#020617] text-white text-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <span className="text-primary font-bold uppercase tracking-widest text-sm">Free Tools</span>
        <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">Free AEO & AI Visibility Tools</h1>
        <p className="text-xl text-gray-300">Audit, generate, validate, and plan your answer-engine optimisation workflows with no signup required.</p>
      </div>
    </section>
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-4 mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 text-gray-500 flex-1 w-full"><Search size={18}/><span>Filter tools by category</span></div>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="w-full md:w-auto bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3">
            <option>All</option>{FREE_TOOL_CATEGORIES.map(c => <option key={c.title}>{c.title}</option>)}
          </select>
        </div>
        {FREE_TOOL_CATEGORIES.filter(c => filter === 'All' || filter === c.title).map(category => (
          <section key={category.title} id={category.anchor} className="mb-16 scroll-mt-32">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{category.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FREE_TOOLS.filter(t => t.category === category.title).map(tool => <Link key={tool.slug} to={`/free-tools/${tool.slug}/`} className="group bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-primary/40 hover:shadow-xl transition-all">
                <div className="text-3xl mb-4">{tool.icon}</div><h3 className="text-xl font-bold mb-3 group-hover:text-primary">{tool.name}</h3><p className="text-gray-600 dark:text-gray-400 mb-6">{tool.description}</p><span className="font-bold text-primary inline-flex items-center">Use Free <ArrowRight size={16} className="ml-2"/></span>
              </Link>)}
            </div>
          </section>
        ))}
      </div>
    </section>
  </div>;
};
