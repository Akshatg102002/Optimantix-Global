
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Check, X } from 'lucide-react';

interface GrowthStats {
  label: string;
  value: string;
  desc: string;
}

interface Props {
  stats?: GrowthStats[];
  serviceName: string;
}

export const ServiceGrowthChart: React.FC<Props> = ({ stats, serviceName }) => {
  return (
    <div className="space-y-12">
      {/* Growth Visualization */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
           <TrendingUp className="text-primary" /> Projected Growth
        </h3>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 h-64 bg-gray-50 dark:bg-black/20 rounded-xl relative flex items-end justify-between p-6 overflow-hidden">
                {/* Simulated Graph Bars */}
                <div className="w-1/5 bg-gray-300 dark:bg-gray-700 h-[30%] rounded-t-md relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">Before</div>
                </div>
                <div className="w-1/5 bg-gray-300 dark:bg-gray-700 h-[45%] rounded-t-md relative group"></div>
                <div className="w-1/5 bg-primary/60 h-[60%] rounded-t-md relative group"></div>
                <div className="w-1/5 bg-primary/80 h-[80%] rounded-t-md relative group"></div>
                <div className="w-1/5 bg-primary h-[95%] rounded-t-md relative group">
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">After</div>
                </div>

                {/* Growth Curve Line (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    <motion.path
                        d="M 30 200 Q 150 150, 350 20" 
                        fill="transparent"
                        stroke="#0056b3"
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </svg>
            </div>

            <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats?.map((stat, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-primary"
                    >
                        <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                        <div className="text-sm font-bold text-gray-700 dark:text-gray-200">{stat.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.desc}</div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>

      {/* Trust Comparison */}
      <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl p-8 shadow-lg">
         <h3 className="text-xl font-bold mb-6 text-center">Why Top Brands Choose Optimantix</h3>
         <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
                 <thead>
                     <tr className="border-b border-white/20">
                         <th className="p-4 font-semibold w-1/2">Feature</th>
                         <th className="p-4 font-bold text-center bg-white/10 rounded-t-lg">Optimantix Global</th>
                         <th className="p-4 font-semibold text-center text-white/60">Traditional Agencies</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr className="border-b border-white/10">
                         <td className="p-4">Dedicated Account Manager</td>
                         <td className="p-4 text-center bg-white/5"><Check className="inline-block" size={20} /></td>
                         <td className="p-4 text-center text-white/50"><X className="inline-block" size={20} /></td>
                     </tr>
                     <tr className="border-b border-white/10">
                         <td className="p-4">Data-Driven Strategy</td>
                         <td className="p-4 text-center bg-white/5"><Check className="inline-block" size={20} /></td>
                         <td className="p-4 text-center text-white/50">Partial</td>
                     </tr>
                     <tr className="border-b border-white/10">
                         <td className="p-4">Transparent Reporting</td>
                         <td className="p-4 text-center bg-white/5"><Check className="inline-block" size={20} /></td>
                         <td className="p-4 text-center text-white/50"><X className="inline-block" size={20} /></td>
                     </tr>
                     <tr>
                         <td className="p-4">ROI Focus</td>
                         <td className="p-4 text-center bg-white/5"><Check className="inline-block" size={20} /></td>
                         <td className="p-4 text-center text-white/50">Varies</td>
                     </tr>
                 </tbody>
             </table>
         </div>
      </div>
    </div>
  );
};
