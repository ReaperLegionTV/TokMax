import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ResultCardProps {
  title: string;
  icon: React.ReactNode;
  content: string | string[];
  type?: 'text' | 'tags' | 'keywords' | 'list';
  className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, icon, content, type = 'text', className = '' }) => {
  const [copied, setCopied] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const formatContent = () => {
    if (!Array.isArray(content)) return content;
    if (type === 'tags') return content.map(t => `#${t}`).join(' ');
    if (type === 'keywords') return content.join(', ');
    return content.join('\n');
  };

  const handleCopy = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const contentString = formatContent();

  return (
    <div className={`glass-panel rounded-2xl p-6 flex flex-col ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-zinc-800 rounded-lg text-cyan-400">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
      </div>

      {type === 'list' && Array.isArray(content) ? (
        <div className="space-y-3">
          {content.map((item, idx) => (
            <div key={idx} className="group relative bg-zinc-900/50 rounded-lg p-3 border border-zinc-800 hover:border-zinc-700 transition-all">
              <p className="text-gray-200 pr-8 text-sm md:text-base">{item}</p>
              <button 
                onClick={() => handleCopy(item, idx)}
                className="absolute right-2 top-2 p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-all"
              >
                {copiedIndex === idx ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative group bg-zinc-900/50 rounded-xl p-4 border border-zinc-800 flex-grow">
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm md:text-base font-mono">
            {contentString}
          </p>
          <button 
            onClick={() => handleCopy(contentString as string)}
            className="absolute right-2 top-2 p-2 rounded-lg bg-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-700 transition-all shadow-lg opacity-0 group-hover:opacity-100"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultCard;