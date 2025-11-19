import React from 'react';
import { TikTokAnalysis } from '../types';
import ResultCard from './ResultCard';
import ViralityScore from './ViralityScore';
import ViralPostPreview from './ViralPostPreview';
import { TrendingUp, Search, Lightbulb } from 'lucide-react';

interface AnalysisDisplayProps {
  data: TikTokAnalysis;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ data }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 space-y-8">
      
      {/* Score & Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center md:col-span-1 relative overflow-hidden min-h-[250px]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-pink-500"></div>
          <h3 className="text-zinc-400 font-medium mb-2 uppercase text-xs tracking-[0.2em]">Virality Potential</h3>
          <ViralityScore score={data.viralityScore} />
          <p className="text-center text-xs text-zinc-500 mt-4 max-w-[240px] leading-relaxed">
            {data.explanation}
          </p>
        </div>

        <div className="md:col-span-2 glass-panel rounded-2xl p-8 flex flex-col">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="bg-yellow-500/10 p-2 rounded-lg">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
            </div>
            <h3 className="text-lg font-bold text-white">Actionable Improvements</h3>
          </div>
          <ul className="space-y-4">
            {data.improvementTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-4 text-sm md:text-base text-gray-300 group">
                 <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-cyan-400 mt-0.5 group-hover:border-cyan-500/50 transition-colors">{i + 1}</span>
                 <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Feature: Viral Post Preview */}
      <div>
         <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
            Optimized Post Preview
         </h2>
         <ViralPostPreview analysis={data} />
      </div>

      {/* Secondary Data: SEO & Alternative Hooks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <ResultCard 
          title="SEO Keywords" 
          icon={<Search className="w-5 h-5" />} 
          content={data.seoKeywords}
          type="keywords"
          className="h-full"
        />

        <ResultCard 
          title="Alternative Hooks" 
          icon={<TrendingUp className="w-5 h-5" />} 
          content={data.viralHooks}
          type="list"
          className="h-full"
        />

      </div>
    </div>
  );
};

export default AnalysisDisplay;