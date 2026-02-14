
import React from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export const PortfolioSlider: React.FC = () => {
  const { projects } = useData();

  if (projects.length === 0) return null;

  return (
    <section className="py-20 bg-white dark:bg-dark-card border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-primary font-bold uppercase tracking-wider text-sm">Our Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900 dark:text-white">Recent Work Showcase</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            We deliver results. Check out some of the projects we have successfully launched for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 aspect-[4/3]"
            >
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-primary font-bold text-xs uppercase tracking-wider mb-2">{project.category}</span>
                <h3 className="text-white text-xl font-bold mb-4">{project.title}</h3>
                {project.projectUrl && (
                  <a 
                    href={project.projectUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center text-white hover:text-primary transition"
                  >
                    View Project <ExternalLink size={16} className="ml-2" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
